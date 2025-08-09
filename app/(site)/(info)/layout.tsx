import '@/app/globals.css';
import type { Metadata } from 'next';
import Navbar from '../components/global/Navbar';
import Footer from '../components/global/Footer';
 

export default function InfoLayout({
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
