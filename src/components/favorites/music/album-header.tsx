import type { Album } from "@/types/favorites/music/music-types";
import StarRating from "./star-rating";
import { Disc3, Dot, Headphones } from "lucide-react";

// Cover + summary info. Shown on its own in the album list, and at the top of an album's page.
export default function AlbumHeader({album}: {album: Album}) {
    const { metadata, review } = album
    return (
        <div className="flex items-start gap-4">
            {/* Album cover */}
            {metadata && (
                <div className="w-fit shrink-0">
                    {/* Hover effect only applies inside a `group` parent (the album list's links) */}
                    <img
                        src={metadata.albumCover}
                        alt={`${album.title} cover`}
                        className="w-40 h-40 rounded-sm transition duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-xl"
                    />
                </div>
            )}
            <div className="flex flex-col justify-between grow min-h-40 p-1">
                <div>
                    <p className="font-semibold font-sans">{album.title}</p>
                    {/* <p>{[album.artist, metadata?.year, metadata?.genre].filter(Boolean).join(" | ")}</p> */}
                    <p>{album.artist}</p>
                    <p className="text-xs font-sans flex items-center">{metadata?.year} <Dot className="w-4 h-4" /> {metadata?.genre}</p>
                    {/* <p>{metadata?.genre}</p> */}
                </div>
                {review && (
                    <div className="mt-auto flex flex-col gap-1">
                        <div className="flex items-center gap-4">
                            <StarRating rating={review.rating} colors={album.colors ?? metadata?.colors} shimmer={album.top10} />
                            {/* Top 10 records spin like they're on the turntable */}
                            {album.onVinyl && <Disc3 className={album.top10 ? "motion-safe:animate-[spin_3s_linear_infinite]" : undefined} />}
                        </div>
                        <p className="flex items-center gap-2 text-sm"><Headphones className="w-4 h-4" />{review.dateListened.toLocaleDateString()}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
