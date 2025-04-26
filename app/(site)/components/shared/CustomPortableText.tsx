'use client';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { Image } from 'sanity';
import React, { useMemo } from 'react';
import ImageBox from './ImageBox';
import Link from 'next/link';
import ClientPlayer from './ClientPlayer';
import * as motion from 'motion/react-client';
import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';

const MotionLink = motion.create(Link);

// Custom list item component that can handle nested lists

export function CustomPortableText({
	paragraphClasses,
	value,
}: {
	paragraphClasses?: string;
	value: PortableTextBlock[];
}) {
	const components: PortableTextComponents = useMemo(() => ({
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
						id={typeof children === 'string' ? children : undefined}
						className="text-2xl md:text-3xl font-bold mt-6 scroll-mt-10	"
					>
						{children}
					</motion.h2>
				);
			},
			h3: ({ children }) => {
				return (
					<motion.h3 className="text-xl md:text-2xl font-bold mt-3">{children}</motion.h3>
				);
			},
		},
		marks: {
			link: ({ children, value }) => {
				const href = value?.href;
				const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));

				return (
					<MotionLink
						// Use inline-flex to keep icon and text together, centered vertically
						className="inline-flex items-center underline transition hover:opacity-50"
						href={href}
						// Only add rel and target for external links
						rel={isExternal ? "noreferrer noopener" : undefined}
						target={isExternal ? '_blank' : undefined}
					>
						{children}
						{/* Conditionally render the icon for external links */}
						{isExternal && (
							<ArrowSquareOut weight="duotone" className="ml-1 h-3 w-3 md:h-6 md:w-6" aria-label="External link" />
						)}
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
					<motion.div className="aspect-auto ">
						<ImageBox
							image={value}
							alt={value.alt || value?.caption}
							classesWrapper="relative"
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
					<motion.div className="w-full h-full aspect-video cursor-pointer m-2">
						<ClientPlayer
							className="relative w-auto h-auto cursor-auto"
							controls={true}
							url={url}
							light={false}
							width="100%"
							height="100%"
							referrerPolicy="no-referrer-when-downgrade"
							playing={false}

						/>
					</motion.div>
				);
			},
		},
	}), [paragraphClasses]);


	return <PortableText components={components} value={value} />;
}