import './../../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '../components/global/Navbar';
import Footer from '../components/global/Footer';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Portfolio - Alan Ren',
	description: 'A personal portfolio built with Next.js by Alan Ren',
	openGraph: {
		images: './icons/logo.png',
	},
};

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="min-h-full">
			<Navbar />
			{children}
			<Footer />
		</main>
	);
}
