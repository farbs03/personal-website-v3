export const albumKey = (e: { artist: string, title: string }) =>
    `${e.artist}::${e.title}`.trim().toLowerCase()

// URL-safe id for an album's page, e.g. "cocteau-twins-heaven-or-las-vegas"
export const albumSlug = (e: { artist: string, title: string }) =>
    `${e.artist} ${e.title}`
        .toLowerCase()
        .normalize("NFD").replace(/[̀-ͯ]/g, "") // strip accents (é -> e)
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
