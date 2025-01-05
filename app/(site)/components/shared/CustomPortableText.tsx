'use client';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { Image } from 'sanity';
import React from 'react';

import ImageBox from './ImageBox';
import Link from 'next/link';
import ClientPlayer from './ClientPlayer';
import { motion } from 'motion/react';

const MotionLink = motion(Link);

// Custom list item component that can handle nested lists

export function CustomPortableText({
	paragraphClasses,
	value,
}: {
	paragraphClasses?: string;
	value: PortableTextBlock[];
}) {
	const components: PortableTextComponents = {
		list: {
			bullet: ({ children }) => (
				<motion.ul className="list-disc ml-5">{children}</motion.ul>
			),
			number: ({ children }) => (
				<motion.ol className="list-decimal ml-4">{children}</motion.ol>
			),
		},
		listItem: ({ children }) => {
			return <motion.li className={`ml-4`}>{children}</motion.li>;
		},

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
					<>
						<ImageBox
							image={value}
							alt={value.alt || value?.caption}
							classesWrapper="relative aspect-[7/4] -z-50"
						/>
						{value?.caption && (
							<div className="font-sans text-sm text-gray-600">
								{value.caption}
							</div>
						)}
					</>
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
							referrerpolicy="no-referrer-when-downgrade"
						/>
					</motion.div>
				);
			},
		},
	};

	return <PortableText components={components} value={value} />;
}
