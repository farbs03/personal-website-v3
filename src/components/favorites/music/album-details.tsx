import { Flame, Gem, Heart, type LucideIcon } from "lucide-react";
import type { Album, SpecialTag } from "@/types/favorites/music/music-types";
import AlbumHeader from "./album-header";

const tagIcons: Record<SpecialTag, { icon: LucideIcon, fill: string, stroke: string }> = {
    "favorite": { icon: Heart, fill: "fill-red-500", stroke: "text-red-700" },
    "underrated": { icon: Gem, fill: "fill-cyan-500", stroke: "text-cyan-700" },
    "most-popular": { icon: Flame, fill: "fill-orange-500", stroke: "text-orange-700" },
}

// fill and stroke are separate layers so filled shapes can't paint over inner lines (e.g. gem facets)
function TagIcon({ tag }: { tag: SpecialTag }) {
    const { icon: Icon, fill, stroke } = tagIcons[tag]
    return (
        <span className="relative w-4 h-4" role="img" aria-label={tag}>
            <Icon className={`absolute inset-0 w-4 h-4 stroke-none ${fill}`} aria-hidden />
            <Icon className={`absolute inset-0 w-4 h-4 ${stroke}`} aria-hidden />
        </span>
    )
}

// ms -> M:SS
function formatDuration(ms: number) {
    const totalSeconds = Math.round(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

// Full album page: header plus the longer fields (review, listens, tracklist)
export default function AlbumDetails({album}: {album: Album}) {
    const { metadata, review } = album
    return (
        <div className="flex flex-col gap-4">
            <AlbumHeader album={album} />
            {review && <p>{review.review}</p>}
            {album.listens !== undefined && <p>Listens: {album.listens}</p>}
            {metadata && (
                <div>
                    {metadata.songs.map((song, idx) => (
                        <div key={song.title} className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <p>{idx + 1}. {song.title}</p>
                                {album.songTags?.[song.title]?.map((tag) => (
                                    <TagIcon key={tag} tag={tag} />
                                ))}
                            </div>
                            {song.durationMs !== undefined && <p>{formatDuration(song.durationMs)}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
