import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { FolderCode, StarIcon, FaceGrinning, type LucideIcon } from 'lucide-react'
import type { ReactElement } from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

type NavbarLink = {
  title: string,
  path: string,
  icon: ReactElement
}

let navbarLinks: NavbarLink[] = [
  {
    title: "Projects",
    path: "/projects",
    icon: <FolderCode className='w-4 h-4' />
  },
  {
    title: "Favorites",
    path: "/favorites",
    icon: <StarIcon className='w-4 h-4' />
  },
  {
    title: "Life",
    path: "/life",
    icon: <FaceGrinning className='w-4 h-4' />
  },
]

function RootComponent() {

  return (
    <div className='p-4 flex flex-col gap-2 font-mono'>
      <div className="grid grid-cols-3">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{' '}
        <div className="flex items-center gap-6 justify-center">
          {navbarLinks.map((navbarLink) => (
            <Link
              to={navbarLink.path}
              activeProps={{
                className: 'font-semibold text-primary',
              }}
              className='flex gap-2 items-center'
            >
              {navbarLink.icon}
              {navbarLink.title}
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  )
}