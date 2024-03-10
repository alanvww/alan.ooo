import '../globals.css';
import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';
import { IsClientCtxProvider } from './utilities/is-client-ctx';
import NewCursor from './components/global/NewCursor';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
	generator: 'Next.js',
	applicationName: `Portfolio - Alan Ren`,
	referrer: 'origin-when-cross-origin',
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
		images: 'opengraph-image.jpg',
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
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="scroll-auto md:scroll-smooth">
			<body className={`w-screen min-h-full text-white bg-black `}>
				<NewCursor />
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
