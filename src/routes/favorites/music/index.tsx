import AlbumHeader from '@/components/favorites/music/album-header'
import { getAlbums } from '@/lib/favorites/music/get-albums'
import { albumSlug } from '@/lib/favorites/music/album-key'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/favorites/music/')({
  component: RouteComponent,
})

// Static data, so build it once at module load rather than every render
const albums = getAlbums()

function RouteComponent() {
  return (
    <div className='flex flex-col gap-4'>
      {albums.map((album) => {
        const slug = albumSlug(album)
        return (
          <Link key={slug} to='/favorites/music/$albumSlug' params={{ albumSlug: slug }} className='hover:opacity-80'>
            <AlbumHeader album={album} />
          </Link>
        )
      })}
    </div>
  )
}
