// Lowercase and strip accents (é -> e), for slugs and accent-insensitive search
export const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")

export const albumKey = (e: { artist: string, title: string }) =>
    `${e.artist}::${e.title}`.trim().toLowerCase()

// URL-safe id for an album's page, e.g. "cocteau-twins-heaven-or-las-vegas"
export const albumSlug = (e: { artist: string, title: string }) =>
    normalize(`${e.artist} ${e.title}`)
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
