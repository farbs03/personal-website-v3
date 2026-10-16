// initial, hand-written info for an album - title and artist get fed into api
export type AlbumEntry = {
    title: string,
    artist: string,
    onVinyl?: boolean
    top10?: boolean // makes cool shimmer and spinny animations on the stars/disc; breaks ties in sorting by rating (higher priority)
    review?: ReviewInfo,
    listens?: number,
    songTags?: Record<string, SpecialTag[]>,
    apiId?: string, // pins the exact release if a search guesses wrong
    colors?: [string, string], // hand-picked override for the rating star gradient (otherwise uses metadata.colors)
}

export type ReviewInfo = {
    rating: number,
    review: string,
    dateListened: Date,
}

export type SpecialTag = "favorite" | "love" | "underrated" | "most-popular"

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

