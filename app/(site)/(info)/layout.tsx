import './../../globals.css';
import type { Metadata } from 'next';
import Navbar from '../components/global/Navbar';
import Footer from '../components/global/Footer';

// const inter = Inter({ subsets: ['latin'] });

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
