import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/favorites/movies')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/favorites/movies"!</div>
}
