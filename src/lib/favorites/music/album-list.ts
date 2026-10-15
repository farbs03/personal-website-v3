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
    {
        title: "Imaginal Disk",
        artist: "Magdalena Bay",
        songTags: {
            "Image": ["favorite", "most-popular"],
            "Watching T.V.": ["favorite", "underrated"],
            "Love is Everywhere": ["favorite"],
            "That's My Floor": ["favorite"],
            "Cry for Me": ["best", "favorite"],
            "Angel on a Satellite": ["favorite", "underrated"]
        },
        review: {
            rating: 10,
            review: "Ethereal",
            dateReviewed: new Date()
        }
    },
    {
        title: "Songs in the Key of Life",
        artist: "Stevie Wonder",
        review: {
            rating: 10,
            review: "Beautiful",
            dateReviewed: new Date()
        }
    }
]