import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { Film, Gamepad2, Music, Tv } from 'lucide-react'

export const Route = createFileRoute('/favorites')({
  component: RouteComponent,
})

const favoritesLinks = [
  { title: 'Music', path: '/favorites/music', icon: <Music className='w-4 h-4' /> },
  { title: 'Movies', path: '/favorites/movies', icon: <Film className='w-4 h-4' /> },
  { title: 'Shows', path: '/favorites/shows', icon: <Tv className='w-4 h-4' /> },
  { title: 'Video Games', path: '/favorites/video-games', icon: <Gamepad2 className='w-4 h-4' /> },
] as const

function RouteComponent() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-4'>
        {favoritesLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className='flex items-center gap-2'
            activeProps={{
              className: 'font-semibold text-sunset',
            }}
          >
            {link.icon}
            {link.title}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  )
}
