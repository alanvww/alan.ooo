import StudioWrapper from './StudioWrapper'

export const dynamic = 'force-static'

// Export the Sanity Studio metadata and viewport
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
	return <StudioWrapper />
}