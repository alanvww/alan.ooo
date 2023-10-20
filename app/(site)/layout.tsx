import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';
import { IsClientCtxProvider } from './utilities/is-client-ctx';
import NewCursor from './components/global/NewCursor';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Portfolio - Alan Ren',
	metadataBase: new URL('https://alan.ooo'),
	description: 'A personal portfolio built with Next.js by Alan Ren',
	openGraph: {
		images: './icons/icon-512x512.png',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="./icons/logo.png"
				></link>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="../../public/favicon-32x32.png"
				></link>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="../../public/favicon-16x16.png"
				></link>
			</head>
			<body className={`w-screen min-h-full text-white bg-black `}>
				<NewCursor />
				<div className="">{children}</div>
			</body>
		</html>
	);
}
