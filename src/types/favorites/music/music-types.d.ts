export type AlbumInfo = {
    // path to the album cover image
    albumCover: string,
    // album metadata
    title: string,
    artist: string,
    year: number,
    genre: string,
    // songs
    songs: SongInfo[]
    // custom review info
    rating: number,
    review?: string,
    dateReviewed: Date,
    listens?: number // is there a way to use the apple music api?
}

export type SongInfo = {
    title: string,
    specialTag?: SpecialTag
}

export type SpecialTag = "favorite" | "underrated" | "most-popular"