import type { AlbumEntry } from "@/types/favorites/music/music-types";

export const albumList: AlbumEntry[] = [
    {
        title: "Heaven or Las Vegas",
        artist: "Cocteau Twins",
        colors: ["#3346b8", "#e8302a"],
        songTags: {
            "Iceblink Luck": ["love"],
            "Heaven or Las Vegas": ["favorite", "most-popular", "love"],
            "I Wear Your Ring": ["love"],
            "Fotzepolitic": ["underrated", "love"],
            "Wolf in the Breast": ["love"],
            "Frou-Frou Foxes in Midsummer Fires": ["love"]
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
            "Image": ["most-popular", "love"],
            "Watching T.V.": ["underrated", "love"],
            "Love is Everywhere": ["love"],
            "That's My Floor": ["love"],
            "Cry for Me": ["favorite", "love"],
            "Angel on a Satellite": ["underrated", "love"]
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