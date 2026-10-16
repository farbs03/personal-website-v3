import AlbumHeader from '@/components/favorites/music/album-header'
import AlbumToolbar, { type AlbumQuery } from '@/components/favorites/music/album-toolbar'
import { getAlbums } from '@/lib/favorites/music/get-albums'
import { albumSlug } from '@/lib/favorites/music/album-key'
import { artistOptions, filterAlbums, genreOptions, sortAlbums, sortKeys, type SortKey } from '@/lib/favorites/music/album-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, MotionConfig, motion, type Variants } from 'motion/react'

// Everything is optional so the plain /favorites/music URL stays clean; defaults are filled in below
type MusicSearch = Partial<AlbumQuery>

const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === 'string')

export const Route = createFileRoute('/favorites/music/')({
  // Search params come from the URL, so anything malformed is just dropped
  validateSearch: (search: Record<string, unknown>): MusicSearch => ({
    q: typeof search.q === 'string' && search.q ? search.q : undefined,
    sort: sortKeys.includes(search.sort as SortKey) ? (search.sort as SortKey) : undefined,
    dir: search.dir === 'asc' || search.dir === 'desc' ? search.dir : undefined,
    artists: isStringArray(search.artists) && search.artists.length ? search.artists : undefined,
    genres: isStringArray(search.genres) && search.genres.length ? search.genres : undefined,
    vinyl: search.vinyl === true ? true : undefined,
  }),
  component: RouteComponent,
})

// Static data, so build it once at module load rather than every render
const albums = getAlbums()
const artists = artistOptions(albums)
const genres = genreOptions(albums)

// The grid orchestrates: once it's visible, each child starts its own animation 80ms after the previous one
const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

// Each album fades up into place
const albumVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

function RouteComponent() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const query: AlbumQuery = { ...search, sort: search.sort ?? 'rating', dir: search.dir ?? 'desc' }

  // Empty values and defaults are left out of the URL. replace: typing a search shouldn't fill up the back button.
  const updateQuery = (patch: Partial<AlbumQuery>) => {
    navigate({
      search: (prev) => {
        const next = { ...prev, ...patch }
        return {
          q: next.q || undefined,
          sort: next.sort === 'rating' ? undefined : next.sort,
          dir: next.dir === 'desc' ? undefined : next.dir,
          artists: next.artists?.length ? next.artists : undefined,
          genres: next.genres?.length ? next.genres : undefined,
          vinyl: next.vinyl || undefined,
        }
      },
      replace: true,
    })
  }
  // Keeps the sort order, drops search + filters
  const clearFilters = () => updateQuery({ q: undefined, artists: undefined, genres: undefined, vinyl: undefined })

  const visible = sortAlbums(filterAlbums(albums, query), query.sort, query.dir)

  return (
    // reducedMotion="user": skips the movement for visitors with "reduce motion" turned on
    <MotionConfig reducedMotion='user'>
      <div className='flex flex-col gap-6'>
        <AlbumToolbar
          query={query}
          onChange={updateQuery}
          onClear={clearFilters}
          artists={artists}
          genres={genres}
          shown={visible.length}
          total={albums.length}
        />

        {visible.length === 0 ? (
          <div className='flex flex-col items-center gap-2 py-16 text-slate-500'>
            <p>No albums match.</p>
            <button type='button' onClick={clearFilters} className='text-sunset hover:underline underline-offset-2'>
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'
            variants={gridVariants}
            initial='hidden'
            animate='visible'
          >
            {/* popLayout: removed albums leave the flow immediately so the rest can slide into place */}
            <AnimatePresence mode='popLayout'>
              {visible.map((album) => {
                const slug = albumSlug(album)
                return (
                  // Children inherit the "hidden" -> "visible" state from the grid, so they only need variants.
                  // layout: animates to the new spot when sorting/filtering moves it
                  <motion.div key={slug} layout variants={albumVariants} exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}>
                    <Link to='/favorites/music/$albumSlug' params={{ albumSlug: slug }} className='group block hover:bg-slate-100 transition duration-200 ease-in rounded-xl'>
                      <AlbumHeader album={album} />
                    </Link>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </MotionConfig>
  )
}
