import { Flame, Gem, Heart, Trophy, type LucideIcon } from "lucide-react";
import type { Album, SpecialTag } from "@/types/favorites/music/music-types";
import { MotionConfig, motion, type Variants } from "motion/react";
import AlbumHeader from "./album-header";

// Order here is the column order in the tracklist's tag grid
const tagIcons: Record<SpecialTag, { icon: LucideIcon, fill: string, stroke: string }> = {
    "best": { icon: Trophy, fill: "fill-yellow-400", stroke: "text-yellow-600" },
    "favorite": { icon: Heart, fill: "fill-red-500", stroke: "text-red-700" },
    "underrated": { icon: Gem, fill: "fill-cyan-500", stroke: "text-cyan-700" },
    "most-popular": { icon: Flame, fill: "fill-orange-500", stroke: "text-orange-700" },
}

// fill and stroke are separate layers so filled shapes can't paint over inner lines (e.g. gem facets)
function TagIcon({ tag }: { tag: SpecialTag }) {
    const { icon: Icon, fill, stroke } = tagIcons[tag]
    return (
        <span className="relative block w-4 h-4" role="img" aria-label={tag}>
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

// Page sections (header, review, listens, tracklist) come in one after another
const pageVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
}

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

// The tracklist is a section too, but it also cascades its own rows once its turn comes
const tracklistVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
}

const songVariants: Variants = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
}

// Full album page: header plus the longer fields (review, listens, tracklist)
export default function AlbumDetails({album}: {album: Album}) {
    const { metadata, review } = album
    return (
        <MotionConfig reducedMotion="user">
        <motion.div className="flex flex-col gap-4" variants={pageVariants} initial="hidden" animate="visible">
            <motion.div variants={sectionVariants}>
                <AlbumHeader album={album} />
            </motion.div>
            {review && <motion.p variants={sectionVariants}>{review.review}</motion.p>}
            {album.listens !== undefined && <motion.p variants={sectionVariants}>Listens: {album.listens}</motion.p>}
            {metadata && (
                <motion.div variants={tracklistVariants}>
                    {metadata.songs.map((song, idx) => {
                        const tags = album.songTags?.[song.title] ?? []
                        return (
                            <motion.div key={song.title} variants={songVariants} className="flex justify-between items-center gap-4">
                                <p>{idx + 1}. {song.title}</p>
                                <div className="flex items-center gap-3 shrink-0">
                                    {/* One fixed column per tag, so each tag's icon lines up down the tracklist */}
                                    <div className="grid grid-cols-4 gap-1">
                                        {tags.map((tag) => (
                                            <span key={tag} className="w-4 h-4">
                                              <TagIcon tag={tag} />
                                            </span>
                                        ))}
                                    </div>
                                    {song.durationMs !== undefined && <p className="tabular-nums">{formatDuration(song.durationMs)}</p>}
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            )}
        </motion.div>
        </MotionConfig>
    )
}
