'use client';

import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { Image } from 'sanity';
import React, { useMemo } from 'react';
import ImageBox from './ImageBox';
import Link from 'next/link';
import ClientPlayer from './ClientPlayer';

export function CustomPortableText({
	paragraphClasses,
	value,
}: {
	paragraphClasses?: string;
	value: PortableTextBlock[];
}) {
	// Using useMemo to prevent recreation of components on each render
	const components: PortableTextComponents = useMemo(() => ({
		list: {
			bullet: ({ children }) => (
				<ul className="list-disc ml-5">{children}</ul>
			),
			number: ({ children }) => (
				<ol className="list-decimal ml-4">{children}</ol>
			),
		},
		listItem: ({ children }) => {
			return <li className="ml-4">{children}</li>;
		},
		block: {
			normal: ({ children }) => {
				return <p className={paragraphClasses}>{children}</p>;
			},
			h2: ({ children }) => {
				return (
					<h2
						id={typeof children === 'string' ? children : undefined}
						className="text-3xl font-bold my-6 scroll-mt-10"
					>
						{children}
					</h2>
				);
			},
			h3: ({ children }) => {
				return (
					<h3 className="text-2xl font-bold my-6">{children}</h3>
				);
			},
		},
		marks: {
			link: ({ children, value }) => {
				return (
					<Link
						className="underline transition hover:opacity-50"
						href={value?.href || '#'}
						rel="noreferrer noopener"
					>
						{children}
					</Link>
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
					<div className="my-6 space-y-2">
						<ImageBox
							image={value}
							alt={value.alt || value?.caption || 'Image'}
							classesWrapper="relative aspect-7/4"
						/>
						{value?.caption && (
							<div className="font-sans text-sm text-gray-600">
								{value.caption}
							</div>
						)}
					</div>
				);
			},
			youtube: ({ value }) => {
				const { url } = value;
				return (
					<div className="w-full h-full aspect-video m-2">
						<ClientPlayer
							className="relative w-auto h-auto"
							controls={true}
							url={url}
							light={false}
							width="100%"
							height="100%"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				);
			},
		},
	}), [paragraphClasses]);

	return <PortableText components={components} value={value} />;
}