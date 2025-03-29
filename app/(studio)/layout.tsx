import { NextStudioLayout } from 'next-sanity/studio'
import React from 'react'
import './studio.css'


export const metadata = {
	title: 'Sanity Studio',
	description: 'Content management for portfolio site',
}


export default function StudioLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<NextStudioLayout>
			{children}
		</NextStudioLayout>
	);
}
