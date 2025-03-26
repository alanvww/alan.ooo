import './globals.css';
import type { Metadata } from 'next';
import type { Viewport } from 'next';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export const viewport: Viewport = {
	colorScheme: 'dark',
	themeColor: 'black',
	width: 'device-width',
	initialScale: 1,
};

export const metadata: Metadata = {
	generator: 'Next.js',
	applicationName: `Portfolio - Alan Ren`,
	keywords: ['Personal Website', 'Portfolio'],
	authors: [{ name: 'Alan Ren' }],
	creator: 'Alan Ren',
	formatDetection: {
		email: true,
		address: false,
		telephone: true,
	},
	title: 'Portfolio - Alan Ren',
	//metadataBase: new URL('https://alan.ooo'),
	description: 'A personal portfolio built with Next.js by Alan Ren',
	openGraph: {
		images: './(site)/opengraph-image.jpg',
	},
	icons: {
		icon: 'favicon.ico',
		shortcut: 'android-chrome-512x512.png',
		apple: 'apple-touch-icon.png',
		other: {
			rel: 'apple-touch-icon-precomposed',
			url: 'android-chrome-512x512.png',
		},
	},
};

// Root layout is the only place that should define html/body structure
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="scroll-auto md:scroll-smooth">
			<body className={`w-screen min-h-full h-auto text-white bg-black `}>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
