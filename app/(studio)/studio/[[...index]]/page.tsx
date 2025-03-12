'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function Studio() {
	return (
		<>
			<style jsx global>{`
				body {
					cursor: auto !important; /* Enable default cursor in studio */
				}
				
				.flare {
					display: none !important; /* Hide custom cursor in studio */
				}
			`}</style>
			<NextStudio config={config} />
		</>
	);
}
