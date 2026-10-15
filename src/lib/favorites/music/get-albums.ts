import type { Album, AlbumMetadataFile } from "@/types/favorites/music/music-types";
import { albumList } from "./album-list";
import { albumKey, albumSlug } from "./album-key";
import albumMetadataRaw from "./album-metadata.json";

const albumMetadata = albumMetadataRaw as unknown as AlbumMetadataFile // JSON infers colors as string[], not a pair

// Joins the hand-written album list with the fetched metadata.
// Albums that haven't been fetched (or weren't found) come back without metadata.
export function getAlbums(): Album[] {
    return albumList.map((entry) => ({
        ...entry,
        metadata: albumMetadata[albumKey(entry)],
    }))
}

export function getAlbumBySlug(slug: string): Album | undefined {
    return getAlbums().find((album) => albumSlug(album) === slug)
}
