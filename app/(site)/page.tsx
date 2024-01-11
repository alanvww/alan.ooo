import dynamic from 'next/dynamic';

import { IsClientCtxProvider } from './utilities/is-client-ctx';

import { Metadata } from 'next';
import HomeMenu from './HomeMenu';

const WebGLBackground = dynamic(() => import('./components/WebGLBackground'), {
	ssr: false,
});

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

export default function Home() {
	return (
		<>
			<WebGLBackground />
			<HomeMenu />
		</>
	);
}
