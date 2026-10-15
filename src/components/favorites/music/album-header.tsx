import type { Album } from "@/types/favorites/music/music-types";
import StarRating from "./star-rating";

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
                        className="w-40 h-40 rounded-sm transition duration-300 ease-out group-hover:-translate-x-1.5 group-hover:shadow-xl"
                    />
                </div>
            )}
            <div className="flex flex-col justify-between grow min-h-40">
                <div>
                    <p className="font-semibold font-sans">{album.title}</p>
                    {/* <p>{[album.artist, metadata?.year, metadata?.genre].filter(Boolean).join(" | ")}</p> */}
                    <p>{album.artist}</p>
                    <p>{metadata?.year}</p>
                    <p>{metadata?.genre}</p>
                </div>
                {review && (
                    <div className="mt-auto">
                        <StarRating rating={review.rating} colors={album.colors ?? metadata?.colors} />
                        <p>Reviewed: {review.dateReviewed.toLocaleDateString()}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
