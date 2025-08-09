// ./src/app/studio/[[...tool]]/page.tsx

import StudioClient from './StudioClient'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
	return <StudioClient />
}