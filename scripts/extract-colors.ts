import { Vibrant } from "node-vibrant/node"

// How much saturation matters when ranking colors. A swatch's score is population * (SATURATION_BASE + saturation),
// so big gray areas still count, but colorful areas of similar size win.
const SATURATION_BASE = 0.3
// The second color must be at least this far around the color wheel from the first (degrees)
const MIN_HUE_GAP = 40

type Candidate = { hex: string, hue: number, saturation: number, lightness: number, score: number }

// Shortest distance between two hues on the 0-360 color wheel
function hueDistance(a: number, b: number) {
    const d = Math.abs(a - b) % 360
    return d > 180 ? 360 - d : d
}

// Picks two prominent, distinct colors from an album cover, for the rating star gradient.
// Returns them ordered darker -> lighter, or undefined if the image couldn't be read.
export async function extractColors(coverUrl: string): Promise<[string, string] | undefined> {
    try {
        // TheAudioDB serves a 250px version at /small - plenty for color extraction
        const res = await fetch(`${coverUrl}/small`)
        if (!res.ok) throw new Error(`${res.status} for ${coverUrl}/small`)
        const image = Buffer.from(await res.arrayBuffer())

        const palette = await Vibrant.from(image).getPalette()
        const candidates: Candidate[] = Object.values(palette)
            .filter((swatch) => swatch !== null)
            .map((swatch) => {
                const [h, s, l] = swatch.hsl // all 0-1
                return {
                    hex: swatch.hex,
                    hue: h * 360,
                    saturation: s,
                    lightness: l,
                    score: swatch.population * (SATURATION_BASE + s),
                }
            })
            .toSorted((a, b) => b.score - a.score)

        const first = candidates[0]
        if (!first) return undefined

        const rest = candidates.slice(1)
        const second =
            rest.find((c) => hueDistance(c.hue, first.hue) >= MIN_HUE_GAP) ??
            // Single-hue cover: fall back to the swatch furthest away in lightness
            rest.toSorted((a, b) => Math.abs(b.lightness - first.lightness) - Math.abs(a.lightness - first.lightness))[0]
        if (!second) return [first.hex, first.hex]

        return first.lightness <= second.lightness ? [first.hex, second.hex] : [second.hex, first.hex]
    } catch (err) {
        console.error(`Couldn't extract colors from ${coverUrl}`, err)
        return undefined
    }
}
