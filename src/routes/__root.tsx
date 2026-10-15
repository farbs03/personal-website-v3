import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { FolderCode, StarIcon, FaceGrinning, Menu } from 'lucide-react'
import type { ReactElement } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu'

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

function RenderNavbarLink({navbarLink}: {navbarLink: NavbarLink}) {
  return (
    <Link
        to={navbarLink.path}
        activeProps={{
          className: 'font-semibold text-sunset',
        }}
        className='flex gap-2 items-center'
      >
        {navbarLink.icon}
        {navbarLink.title}
    </Link>
  )
}

function RootComponent() {

  return (
    <div className='p-4 flex flex-col gap-2 font-mono max-w-7xl w-full mx-auto'>
      <div className="md:grid md:grid-cols-3 flex justify-between">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        {/* Medium+ screen size */}
        <div className="md:flex items-center gap-6 justify-center flex-row hidden">
          {navbarLinks.map((navbarLink) => (
            <RenderNavbarLink navbarLink={navbarLink} />
          ))}
        </div>
        {/* Mobile screens */}
        <div className='md:hidden flex'>
          <DropdownMenu>
            <DropdownMenuTrigger 
              render={
                <button className='p-1 rounded-sm hover:bg-gray-200 transition duration-100 ease-in'>
                  <Menu className='w-4 h-4' />
                </button>
              }
            >
              Open
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 flex flex-col gap-2 px-4 py-2">
              {navbarLinks.map((navbarLink) => (
                <RenderNavbarLink navbarLink={navbarLink} />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Outlet />
    </div>
  )
}