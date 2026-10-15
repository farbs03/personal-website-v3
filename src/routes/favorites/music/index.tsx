import AlbumHeader from '@/components/favorites/music/album-header'
import { getAlbums } from '@/lib/favorites/music/get-albums'
import { albumSlug } from '@/lib/favorites/music/album-key'
import { Link, createFileRoute } from '@tanstack/react-router'
import { MotionConfig, motion, type Variants } from 'motion/react'

export const Route = createFileRoute('/favorites/music/')({
  component: RouteComponent,
})

// Static data, so build it once at module load rather than every render
const albums = getAlbums()

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
  return (
    // reducedMotion="user": skips the movement for visitors with "reduce motion" turned on
    <MotionConfig reducedMotion='user'>
      <motion.div
        className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'
        variants={gridVariants}
        initial='hidden'
        animate='visible'
      >
        {albums.map((album) => {
          const slug = albumSlug(album)
          return (
            // Children inherit the "hidden" -> "visible" state from the grid, so they only need variants
            <motion.div key={slug} variants={albumVariants}>
              <Link to='/favorites/music/$albumSlug' params={{ albumSlug: slug }} className='group block hover:bg-slate-100 transition duration-200 ease-in rounded-xl'>
                <AlbumHeader album={album} />
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </MotionConfig>
  )
}
