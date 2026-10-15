import type { AlbumEntry, AlbumMetadata, AlbumMetadataFile } from "../src/types/favorites/music/music-types"
import { albumList } from "../src/lib/favorites/music/album-list"
import { albumKey } from "../src/lib/favorites/music/album-key"
import { extractColors } from "./extract-colors"


import { writeFile } from "node:fs/promises"

const AUDIODB_BASE = "https://www.theaudiodb.com/api/v1/json/123"
const MUSICBRAINZ_BASE = "https://musicbrainz.org/ws/2"
// MusicBrainz asks for an identifying User-Agent: "AppName/version ( contact-url-or-email )"
const USER_AGENT = "personal-website-v3/0.1 ( chrisgfarber@gmail.com )"

const DELAY_MS = 1500 // MusicBrainz allows 1 req/s

const METADATA_PATH = new URL( "../src/lib/favorites/music/album-metadata.json", import.meta.url)
import albumMetadataRaw from "../src/lib/favorites/music/album-metadata.json"
const albumMetadata = albumMetadataRaw as unknown as AlbumMetadataFile // JSON infers colors as string[], not a pair

// Raw TheAudioDB album shape (only the fields we use). Numbers come back as strings.
type AudioDbAlbum = {
    idAlbum: string,
    strAlbum: string,
    strArtist: string,
    intYearReleased: string | null,
    strGenre: string | null,
    strAlbumThumb: string | null,
    strMusicBrainzID: string | null, // a MusicBrainz release-group id
}

// Raw MusicBrainz release shape (only the fields we use)
type MbRelease = {
    status?: string,
    date?: string,
    media: { tracks: { position: number, title: string, length: number | null }[] }[],
}

async function getJson<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const res = await fetch(url, { headers })
    if (!res.ok) throw new Error(`${res.status} for ${url}`)
    return res.json() as Promise<T>
}

// MusicBrainz uses typographic punctuation (‐ ’ “) - swap to plain ASCII so titles match songTags keys
function normalizeTitle(title: string) {
    return title
        .replace(/[‐-―]/g, "-")
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, '"')
}

async function findAudioDbAlbum(entry: AlbumEntry): Promise<AudioDbAlbum | undefined> {
    if (entry.apiId) {
        const data = await getJson<{ album: AudioDbAlbum[] | null }>(
            `${AUDIODB_BASE}/album.php?m=${encodeURIComponent(entry.apiId)}`
        )
        return data.album?.[0]
    }

    const data = await getJson<{ album: AudioDbAlbum[] | null }>(
        `${AUDIODB_BASE}/searchalbum.php?s=${encodeURIComponent(entry.artist)}&a=${encodeURIComponent(entry.title)}`
    )
    // Search can return several editions - prefer an exact title match
    const wanted = entry.title.trim().toLowerCase()
    return data.album?.find((a) => a.strAlbum.trim().toLowerCase() === wanted) ?? data.album?.[0]
}

// TheAudioDB's free key truncates tracklists, so get them from MusicBrainz instead.
// Uses the earliest official release in the release group (usually the original pressing).
async function fetchTracklist(releaseGroupId: string): Promise<AlbumMetadata["songs"]> {
    const data = await getJson<{ releases: MbRelease[] }>(
        `${MUSICBRAINZ_BASE}/release?release-group=${releaseGroupId}&inc=recordings+media&fmt=json&limit=100`,
        { "User-Agent": USER_AGENT }
    )

    const official = data.releases.filter((r) => r.status === "Official")
    const candidates = official.length ? official : data.releases
    // Undated releases sort last
    const release = candidates.toSorted((a, b) => (a.date || "9999").localeCompare(b.date || "9999"))[0]
    if (!release) return []

    // Flatten all discs in order
    return release.media.flatMap((disc) =>
        disc.tracks
            .toSorted((a, b) => a.position - b.position)
            .map((t) => ({
                title: normalizeTitle(t.title),
                durationMs: t.length ?? undefined,
            }))
    )
}

// Finds the album (by apiId if pinned, otherwise by artist + title search) and its tracklist.
// Returns null if no match was found. Makes 1 TheAudioDB request + 1 MusicBrainz request,
// so callers should wait ~1s+ between albums (MusicBrainz allows 1 request/second).
export async function fetchAlbum(entry: AlbumEntry): Promise<AlbumMetadata | null> {
    const album = await findAudioDbAlbum(entry)
    if (!album) return null

    const songs = album.strMusicBrainzID ? await fetchTracklist(album.strMusicBrainzID) : []
    const colors = album.strAlbumThumb ? await extractColors(album.strAlbumThumb) : undefined

    return {
        albumCover: album.strAlbumThumb ?? "",
        year: Number(album.intYearReleased ?? 0),
        genre: album.strGenre ?? "",
        songs,
        colors,
    }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// force: refetch everything. recolor: recompute cover colors for cached albums (without refetching them).
export async function fetchAllAlbums({force = false, recolor = false} = {}) {
    // Start from what's already cached so unchanged albums aren't refetched
    const result: AlbumMetadataFile = force ? {} : { ...albumMetadata }
    let fetched = 0, skipped = 0, recolored = 0
    const missed: string[] = []

    for (const entry of albumList) {
        const key = albumKey(entry)
        const label = `${entry.artist} – ${entry.title}`

        const cached = result[key]
        if (cached) {
            // Backfill colors for albums cached before color extraction existed (only hits the image host, no delay needed)
            if ((recolor || !cached.colors) && cached.albumCover) {
                const colors = await extractColors(cached.albumCover)
                if (colors) {
                    result[key] = { ...cached, colors }
                    recolored++
                    console.log(`Recolored - ${label}: ${colors.join(" -> ")}`)
                }
            }
            skipped++
            continue
        }

        try {
            // TODO: call fetchAlbum(entry)
            let metadata = await fetchAlbum(entry)
            if (metadata) {
                result[key] = metadata
                fetched++
                console.log(`Got it - ${label}`)
            }
            else {
                missed.push(key)
                console.log(`No match - ${label}`)
            }
        } catch (err) {
            console.error(`Error - ${label}`, err)
            missed.push(key)
        }

        await sleep(DELAY_MS)
    }

    // Drop cached albums that have been removed (or renamed) in albumList
    const listKeys = new Set(albumList.map(albumKey))
    for (const key of Object.keys(result)) {
        if (!listKeys.has(key)) {
            delete result[key]
            console.log(`Removed - ${key}`)
        }
    }

    await writeFile(METADATA_PATH, JSON.stringify(result, null, 2) + "\n")

    // TODO: print a summary, e.g. `${fetched} fetched, ${skipped} cached, ${missed.length} missed`
    // and list each missed album
    console.log(`Summary: ${fetched} fetched, ${skipped} cached (${recolored} recolored), ${missed.length} missed`)
    console.log("Missed:")
    for (const key of missed) {
        console.log(`- ${key}`)
    }
}

fetchAllAlbums({
    force: process.argv.includes("--force"),
    recolor: process.argv.includes("--colors"),
})