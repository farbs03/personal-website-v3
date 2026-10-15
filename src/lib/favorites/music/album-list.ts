import type { AlbumEntry } from "@/types/favorites/music/music-types";

export const albumList: AlbumEntry[] = [
    {
        title: "Heaven or Las Vegas",
        artist: "Cocteau Twins",
        colors: ["#3346b8", "#e8302a"],
        songTags: {
            "Iceblink Luck": ["favorite"],
            "Heaven or Las Vegas": ["favorite", "most-popular"],
            "I Wear Your Ring": ["favorite"],
            "Fotzepolitic": ["favorite"],
            "Wolf in the Breast": ["favorite"],
            "Frou-Frou Foxes in Midsummer Fires": ["favorite"]
        },
        review: {
            rating: 10,
            review: "Ethereal",
            dateReviewed: new Date()
        }
    },
]