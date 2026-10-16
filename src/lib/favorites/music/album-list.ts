import type { AlbumEntry } from "@/types/favorites/music/music-types";
import { m } from "motion/react";

export const albumList: AlbumEntry[] = [
    {
        title: "Heaven or Las Vegas",
        artist: "Cocteau Twins",
        colors: ["#3346b8", "#e8302a"],
        songTags: {
            "Iceblink Luck": ["love"],
            "Heaven or Las Vegas": ["favorite", "most-popular", "love"],
            "I Wear Your Ring": ["love"],
            "Fotzepolitic": ["favorite", "underrated", "love"],
            "Wolf in the Breast": ["love"],
            "Frou-Frou Foxes in Midsummer Fires": ["favorite", "love"]
        },
        review: {
            rating: 10,
            review: "ouuu roouuuddaaa",
            dateReviewed: new Date()
        }
    },
    {
        title: "Imaginal Disk",
        artist: "Magdalena Bay",
        songTags: {
            "Image": ["most-popular", "love"],
            "Death & Romance": ["love"],
            "Watching T.V.": ["underrated", "love"],
            "Tunnel Vision": ["love"],
            "Love Is Everywhere": ["love"],
            "That's My Floor": ["love"],
            "Cry for Me": ["favorite", "love"],
            "Angel on a Satellite": ["favorite", "underrated", "love"],
            "The Ballad of Matt & Mica": ["love"]
        },
        review: {
            rating: 10,
            review: "damn man, play that thing",
            dateReviewed: new Date()
        }
    },
    {
        title: "Songs in the Key of Life",
        artist: "Stevie Wonder",
        songTags: {
            "Love's in Need of Love Today": ["love"],
            "Sir Duke": ["love"],
            "I Wish": ["love"],
            "Knocks Me Off My Feet": ["underrated", "love"],
            "Summer Soft": ["underrated", "love"],
            "Isn't She Lovely": ["love"],
            "Joy Inside My Tears": ["underrated", "love"],
            "Ngiculela - Es Una Historia / I Am Singing": ["love"],
            "As": ["favorite", "most-popular", "love"],
            "Saturn": ["love"]
        },
        review: {
            rating: 10,
            review: "you can feel it all overrrrr",
            dateReviewed: new Date()
        }
    },
    {
        title: "Section.80",
        artist: "Kendrick Lamar",
        review: {
            rating: 8,
            review: "we got eighty-HD",
            dateReviewed: new Date()
        }
    },
    {
        title: "good kid, m.A.A.d city",
        artist: "Kendrick Lamar",
        songTags: {
            "Bitch, Don't Kill My Vibe": ["love"],
            "Backseat Freestyle": ["love"],
            "Money Trees": ["love"],
            "Poetic Justice": ["most-popular", "love"],
            "Good Kid": ["love"],
            "m.A.A.d city": ["love"],
            "Swimming Pools (Drank) (extended version)": ["love"],
            "Sing About Me, I'm Dying of Thirst": ["favorite", "love"],
            "The Recipe": ["underrated", "love"],
            "Now or Never": ["underrated", "love"]
        },
        review: {
            rating: 10,
            review: "bich don't kill my vibe",
            dateReviewed: new Date()
        }
    },
    {
        title: "To Pimp a Butterfly",
        artist: "Kendrick Lamar",
        songTags: {
            "Wesley's Theory": ["favorite", "underrated", "love"],
            "King Kunta": ["love"],
            "These Walls": ["underrated", "love"],
            "u": ["love"],
            "Alright": ["most-popular", "love"],
            "For Sale? (interlude)": ["underrated", "love"],
            "Complexion (A Zulu Love)": ["underrated", "love"],
            "The Blacker the Berry": ["love"],
            "i": ["underrated", "love"]
        },
        review: {
            rating: 10,
            review: "cause i (want youuuuu)",
            dateReviewed: new Date()
        },
    },
    {
        title: "untitled unmastered.",
        artist: "Kendrick Lamar",
        songTags: {

        },
        review: {
            rating: 8,
            review: "walking around with them... blue faces",
            dateReviewed: new Date()
        }
    },
    {
        title: "DAMN.",
        artist: "Kendrick Lamar",
        songTags: {

        },
        review: {
            rating: 8,
            review: "Damn",
            dateReviewed: new Date()
        }
    },
    {
        title: "GNX",
        artist: "Kendrick Lamar",
        songTags: {

        },
        review: {
            rating: 9,
            review: "bing bop boom boom boom bop bam",
            dateReviewed: new Date()
        }
    },
    {
        title: "Currents",
        artist: "Tame Impala",
        songTags: {
            "Let It Happen": ["love"],
            "Nangs": ["love"],
            "Yes I'm Changing": ["underrated", "love"],
            "Eventually": ["love"],
            "The Less I Know the Better": ["most-popular", "love"],
            "Past Life": ["favorite", "underrated", "love"],
            "Cause I'm a Man": ["love"],
            "Reality in Motion": ["love"],
            "New Person, Same Old Mistakes": ["love"],
        },
        review: {
            rating: 10,
            review: "in a past lifeeee",
            dateReviewed: new Date()
        }
    },
    {
        title: "The Miseducation of Lauryn Hill",
        artist: "Lauryn Hill",
        songTags: {
            "Ex-Factor": ["most-popular", "love"],
            "Doo Wop (That Thing)": ["love"],
            "Every Ghetto, Every City": ["underrated", "love"],
            "Nothing Even Matters": ["love"],
            "The Miseducation of Lauryn Hill": ["favorite", "underrated", "love"],
            "Can't Take My Eyes Off of You": ["love"],
            "Tell Him": ["favorite", "love"]
        },
        review: {
            rating: 10,
            review: "telllll himmmm it'll be alright",
            dateReviewed: new Date()
        }
    },
    {
        title: "Random Access Memories",
        artist: "Daft Punk",
        songTags: {
            "Give Life Back to Music": ["love"],
            "Giorgio by Moroder": ["love"],
            "Instant Crush": ["love"],
            "Lose Yourself to Dance": ["love"],
            "Touch": ["love"],
            "Get Lucky": ["most-popular", "love"],
            "Contact": ["favorite", "underrated", "love"]
        },
        review: {
            rating: 10,
            review: "my name is giovanni giorgio, but most people call me giorgio",
            dateReviewed: new Date()
        }
    },
    {
        title: "Discovery",
        artist: "Daft Punk",
        songTags: {
            "One More Time": ["favorite", "most-popular", "love"],
            "Aerodynamic": ["love"],
            "Digital Love": ["love"],
            "Crescendolls": ["underrated", "love"],
            "Superheroes": ["underrated", "love"],
            "High Life": ["love"],
            "Voyager": ["love"],
            "Verdis Quo": ["love"],
            "Too Long": ["underrated", "love"]
        },
        review: {
            rating: 10,
            review: "ONE. MORE. TIMEEEE",
            dateReviewed: new Date()
        }
    },
    {
        title: "Modal Soul",
        artist: "Nujabes",
        review: {
            rating: 8,
            review: "it's funny how the music put times in perspective",
            dateReviewed: new Date()
        }
    },
    {
        title: "Luv(sic) Hexalogy",        
        artist: "Nujabes",
        review: {
            rating: 8,
            review: "snowflakes in january, heartwarm like february",
            dateReviewed: new Date()
        }

    },
    {
        title: "Spiritual State",
        artist: "Nujabes",
        review: {
            rating: 9,
            review: "Yes",
            dateReviewed: new Date()
        }
    },
    {
        title: "4eva Is a Mighty Long Time",
        artist: "Big K.R.I.T.",
        review: {
            rating: 9,
            review: "it's 24/7 like a waffle cook, in a waffle house kitchen",
            dateReviewed: new Date()
        }
    },
    {
        title: "BRAT",
        artist: "Charli xcx",
        review: {
            rating: 9,
            review: "brat",
            dateReviewed: new Date()
        }
    },
    {
        title: "The College Dropout",
        artist: "Kanye West",
        review: {
            rating: 9,
            review: "mayonaise-colored benz, I push miracle whips",
            dateReviewed: new Date()
        }
    },
    {
        title: "Graduation",
        artist: "Kanye West",
        review: {
            rating: 9,
            review: "chi city",
            dateReviewed: new Date()
        }
    },
    {
        title: "My Beautiful Dark Twisted Fantasy",
        artist: "Kanye West",
        review: {
            rating: 9,
            review: "CAN WE GET MUCH HIGHERRR??",
            dateReviewed: new Date()
        }
    },
    {
        title: "Popstar",
        artist: "Tinashe",
        review: {
            rating: 9,
            review: "i wanna tustle, i wanna wrustle",
            dateReviewed: new Date()
        }
    },
]