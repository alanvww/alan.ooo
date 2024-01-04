import '../globals.css';
import type { Metadata } from 'next';
import type {} from 'next';

import { Inter } from 'next/font/google';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';
import Header from './components/global/Header';
import { IsClientCtxProvider } from './utilities/is-client-ctx';
import NewCursor from './components/global/NewCursor';

// const inter = Inter({ subsets: ['latin'] });

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
	metadataBase: new URL('https://alan.ooo'),
	description: 'A personal portfolio built with Next.js by Alan Ren',
	openGraph: {
		images: '../opengraph-image.jpg',
	},
	icons: {
		icon: './icons/logo.png',
		shortcut: './icons/shortcut_logo.png',
		apple: './icons/apple-touch-icon.png',
		other: {
			rel: 'apple-touch-icon-precomposed',
			url: './icons/apple-touch-icon.png',
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`w-screen min-h-full text-white bg-black `}>
				<NewCursor />
				{children}
			</body>
		</html>
	);
}
