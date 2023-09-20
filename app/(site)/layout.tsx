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
	description: 'A personal portfolio built with Next.js by Alan Ren',
	openGraph: {
		images: './icons/logo.png',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`w-screen h-screen text-white bg-black `}>
				<NewCursor />
				<div className="">{children}</div>
			</body>
		</html>
	);
}
