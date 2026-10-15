import type { Album } from "@/types/favorites/music/music-types";

export const DummyAlbums: Album[] = [
    {
        title: "Heaven or Las Vegas",
        artist: "Cocteau Twins",
        songTags: {
            "Cherry-Coloured Funk": ["love", "most-popular", "underrated"]
        },
        metadata: {
            albumCover: "https://r2.theaudiodb.com/images/media/album/thumb/u0dk791605684866.jpg",
            year: 1990,
            genre: "Dream Pop",
            songs: [
                {
                    title: "Cherry-Coloured Funk",
                    durationMs: 200000
                }
            ],
        },
        review: {
            rating: 5,
            review: "Ethereal",
            dateReviewed: new Date(),
        },
        listens: 100,
    }
]
