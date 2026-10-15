import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/favorites/shows')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/favorites/shows"!</div>
}
