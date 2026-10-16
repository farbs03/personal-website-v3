import type { Album } from "@/types/favorites/music/music-types";
import { normalize } from "./album-key";

export const sortKeys = ["rating", "released", "listened"] as const
export type SortKey = (typeof sortKeys)[number]
export type SortDir = "asc" | "desc"

export const sortLabels: Record<SortKey, string> = {
    rating: "Rating",
    released: "Release date",
    listened: "Listened Date",
}

export type AlbumFilters = {
    q?: string,
    artists?: string[],
    genres?: string[],
    vinyl?: boolean,
}

// AND across categories, OR within one (e.g. either selected artist, but must also be on vinyl)
export function filterAlbums(albums: Album[], { q, artists, genres, vinyl }: AlbumFilters): Album[] {
    const query = q ? normalize(q.trim()) : ""
    return albums.filter((album) =>
        (!query || normalize(album.title).includes(query) || normalize(album.artist).includes(query)) &&
        (!artists?.length || artists.includes(album.artist)) &&
        (!genres?.length || (!!album.metadata?.genre && genres.includes(album.metadata.genre))) &&
        (!vinyl || !!album.onVinyl)
    )
}

const sortValue: Record<SortKey, (album: Album) => number | undefined> = {
    rating: (album) => album.review?.rating,
    released: (album) => album.metadata?.year,
    listened: (album) => album.review?.dateListened.getTime(),
}

// Albums missing the sort value (no review / no metadata) always go last, whichever direction
export function sortAlbums(albums: Album[], sort: SortKey, dir: SortDir): Album[] {
    const sign = dir === "asc" ? 1 : -1
    return albums.toSorted((a, b) => {
        const av = sortValue[sort](a)
        const bv = sortValue[sort](b)
        if (av === undefined || bv === undefined) {
            if (av !== bv) return av === undefined ? 1 : -1
        } else if (av !== bv) {
            return (av - bv) * sign
        } else if (sort === "rating" && !!a.top10 !== !!b.top10) {
            // Same rating: a top 10 album counts as the higher one
            return (a.top10 ? 1 : -1) * sign
        }
        return a.title.localeCompare(b.title)
    })
}

const uniqueSorted = (values: (string | undefined)[]) =>
    [...new Set(values.filter((v): v is string => !!v))].sort((a, b) => a.localeCompare(b))

export const artistOptions = (albums: Album[]) => uniqueSorted(albums.map((a) => a.artist))
export const genreOptions = (albums: Album[]) => uniqueSorted(albums.map((a) => a.metadata?.genre))
