import AlbumDetails from '@/components/favorites/music/album-details'
import { getAlbumBySlug } from '@/lib/favorites/music/get-albums'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/favorites/music/$albumSlug')({
  loader: ({ params }) => {
    const album = getAlbumBySlug(params.albumSlug)
    if (!album) throw notFound()
    return album
  },
  component: RouteComponent,
  notFoundComponent: () => <p>Album not found.</p>,
})

function RouteComponent() {
  const album = Route.useLoaderData()
  return (
    <div className='flex flex-col gap-4'>
      <Link to='/favorites/music' className='w-fit hover:opacity-80 flex items-center gap-2'><ArrowLeft className='w-4 h-4' /> Back to music</Link>
      <AlbumDetails album={album} />
    </div>
  )
}
