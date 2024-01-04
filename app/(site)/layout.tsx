import '../globals.css';
import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';
import Header from './components/global/Header';
import { IsClientCtxProvider } from './utilities/is-client-ctx';
import NewCursor from './components/global/NewCursor';

// const inter = Inter({ subsets: ['latin'] });

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
