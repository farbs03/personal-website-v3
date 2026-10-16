import { useId, type CSSProperties } from "react";

// Lucide's star shape (24x24), drawn by hand so all 5 stars can share one SVG and one gradient
const STAR_PATH = "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
const STAR = 24
const GAP = 2
const WIDTH = STAR * 5 + GAP * 4
const DEFAULT_COLORS: [string, string] = ["var(--color-sunset)", "var(--color-sunset)"]
const SHINE = 16 // width of the shimmer's highlight band

// Shows a 1-10 rating as 5 stars, where each point is half a star.
// Empty outlines are drawn underneath; filled stars are drawn on top and clipped to the rating.
// The fill is a single gradient spanning the whole row, so colors flow across stars.
// `shimmer` sweeps a highlight band across the filled stars on a loop.
export default function StarRating({ rating, colors = DEFAULT_COLORS, shimmer = false, className = "h-5" }: {
    rating: number,
    colors?: [string, string],
    shimmer?: boolean,
    className?: string,
}) {
    const id = useId()
    const points = Math.min(10, Math.max(0, Math.round(rating)))
    const fullStars = Math.floor(points / 2)
    const clipWidth = fullStars * (STAR + GAP) + (points % 2) * (STAR / 2)
    const stars = [0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={STAR_PATH} transform={`translate(${i * (STAR + GAP)} 0)`} />
    ))

    return (
        <svg
            viewBox={`0 0 ${WIDTH} ${STAR}`}
            className={`w-auto ${className}`}
            role="img"
            aria-label={`${points / 2} out of 5 stars`}
            strokeWidth={2}
            strokeLinejoin="round"
        >
            <defs>
                <linearGradient id={`${id}-grad`} gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={WIDTH} y2={0}>
                    <stop offset="0%" style={{ stopColor: colors[0] }} />
                    <stop offset="100%" style={{ stopColor: colors[1] }} />
                </linearGradient>
                {/* Star shapes (fill + stroke, so filled stars match the outlines' size) */}
                <mask id={`${id}-mask`}>
                    <g fill="white" stroke="white">
                        {stars}
                    </g>
                </mask>
                {shimmer && (
                    <>
                        <linearGradient id={`${id}-shine`}>
                            <stop offset="0%" stopColor="white" stopOpacity={0} />
                            <stop offset="50%" stopColor="white" stopOpacity={0.7} />
                            <stop offset="100%" stopColor="white" stopOpacity={0} />
                        </linearGradient>
                        <clipPath id={`${id}-clip`}>
                            <rect x={0} y={0} width={clipWidth} height={STAR} />
                        </clipPath>
                    </>
                )}
            </defs>

            {/* Empty outlines */}
            <g fill="none" stroke="currentColor" className="text-muted-foreground/40">
                {stars}
            </g>

            {/* Filled stars: one gradient rect spanning the row, cut to the rating's width and masked to the
                star shapes. (Filling the translated paths directly would restart the gradient in each star.) */}
            <rect
                x={0} y={0} width={clipWidth} height={STAR}
                fill={`url(#${id}-grad)`}
                mask={`url(#${id}-mask)`}
            />

            {/* Shimmer: a highlight band that starts off the left edge and slides across, masked to the
                star shapes and clipped to the filled part so empty stars stay dull */}
            {shimmer && (
                <g mask={`url(#${id}-mask)`} clipPath={`url(#${id}-clip)`}>
                    <rect
                        x={-SHINE} y={0} width={SHINE} height={STAR}
                        fill={`url(#${id}-shine)`}
                        className="star-shimmer"
                        style={{ "--shimmer-distance": `${WIDTH + SHINE}px` } as CSSProperties}
                    />
                </g>
            )}
        </svg>
    )
}
