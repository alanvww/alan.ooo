import '@/app/globals.css';
import type { Metadata } from 'next';
import Navbar from '../components/global/Navbar';
import Footer from '../components/global/Footer';
import ScrollManager from '../components/shared/ScrollManager';
 

export default function InfoLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<ScrollManager />
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
