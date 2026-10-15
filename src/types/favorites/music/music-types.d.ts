// initial, hand-written info for an album - title and artist get fed into api
export type AlbumEntry = {
    title: string,
    artist: string,
    review?: ReviewInfo,
    listens?: number,
    songTags?: Record<string, SpecialTag[]>,
    apiId?: string, // pins the exact release if a search guesses wrong
    colors?: [string, string], // hand-picked override for the rating star gradient (otherwise uses metadata.colors)
}

export type ReviewInfo = {
    rating: number,
    review: string,
    dateReviewed: Date,
}

export type SpecialTag = "best" | "favorite" | "underrated" | "most-popular"

// fetched by api
export type AlbumMetadata = {
    // album metadata
    albumCover: string,
    year: number,
    genre: string,
    songs:  { title: string, durationMs?: number }[]
    colors?: [string, string] // extracted from the album cover, used for the rating star gradient
}

export type AlbumMetadataFile = Record<string, AlbumMetadata> // for loading in the metadata json

// displayed
export type Album = AlbumEntry & { metadata?: AlbumMetadata }

