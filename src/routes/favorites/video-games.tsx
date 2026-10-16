import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/favorites/video-games')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/favorites/video-games"!</div>
}
