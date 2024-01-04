import { getProfile } from '@/sanity/sanity.query';
import type { ProfileType } from '@/types';
import Job from './components/Job';
import HeroSvg from './icons/HeroSvg';

import Image from 'next/image';
import LongLogo from './icons/logo_long.png';

import dynamic from 'next/dynamic';

import { IsClientCtxProvider } from './utilities/is-client-ctx';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
	metadataBase: new URL('https://alan.ooo'),
	description: 'A personal portfolio built with Next.js by Alan Ren',
	openGraph: {
		images: './opengraph-image.jpg',
	},
	icons: {
		icon: './icons/shortcut_logo.png',
		shortcut: './icons/shortcut_logo.png',
		apple: './icons/apple-touch-icon.png',
		other: {
			rel: 'apple-touch-icon-precomposed',
			url: './icons/apple-touch-icon.png',
		},
	},
};

export default function Home() {
	return (
		<>
			{
				// <HydraCanvas />
				//	<GLSLBackground />
				<WebGLBackground />
			}
			<HomeMenu />
		</>
	);
}
