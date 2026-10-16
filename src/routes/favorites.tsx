import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/favorites')({
  component: RouteComponent,
})

const favoritesLinks = [
  { title: 'Music', path: '/favorites/music' },
  { title: 'Movies', path: '/favorites/movies' },
  { title: 'Shows', path: '/favorites/shows' },
  { title: 'Video Games', path: '/favorites/video-games' },
] as const

function RouteComponent() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        {favoritesLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            activeProps={{
              className: 'font-semibold text-sunset',
            }}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  )
}
