'use client';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { Image } from 'sanity';

import ImageBox from './ImageBox';
import Link from 'next/link';
import ClientPlayer from './ClientPlayer';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

export function CustomPortableText({
	paragraphClasses,
	value,
}: {
	paragraphClasses?: string;
	value: PortableTextBlock[];
}) {
	const components: PortableTextComponents = {
		block: {
			normal: ({ children }) => {
				return <motion.p className={paragraphClasses}>{children}</motion.p>;
			},
			h2: ({ children }) => {
				return (
					<motion.h2
						id={`${children?.toString()}`}
						className="text-3xl font-bold my-6 scroll-mt-10	"
					>
						{children}
					</motion.h2>
				);
			},
			h3: ({ children }) => {
				return (
					<motion.h3 className="text-2xl font-bold my-6">{children}</motion.h3>
				);
			},
		},
		marks: {
			link: ({ children, value }) => {
				return (
					<MotionLink
						className="underline transition hover:opacity-50"
						href={value?.href}
						rel="noreferrer noopener"
					>
						{children}
					</MotionLink>
				);
			},
		},
		types: {
			image: ({
				value,
			}: {
				value: Image & { alt?: string; caption?: string };
			}) => {
				return (
					<motion.div className="my-6 space-y-2 -z-10">
						<ImageBox
							image={value}
							alt={value.alt}
							classesWrapper="relative aspect-[16/9]"
						/>
						{value?.caption && (
							<div className="font-sans text-sm text-gray-600">
								{value.caption}
							</div>
						)}
					</motion.div>
				);
			},
			youtube: ({ value }) => {
				const { url } = value;
				return (
					<motion.div className="w-full h-full aspect-video cursor-pointer	">
						<ClientPlayer
							controls={true}
							url={url}
							light={false}
							width="100%"
							height="100%"
						/>
					</motion.div>
				);
			},
		},
	};

	return <PortableText components={components} value={value} />;
}
