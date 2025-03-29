'use client';

import { PortableTextBlock } from '@portabletext/types';
import React, { FC, useMemo } from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import ImageBox from './ImageBox';
import type { Image } from 'sanity';

interface ProjectPortableTextProps {
	paragraphClasses?: string;
	value: PortableTextBlock[];
}

export const ProjectPortableText: FC<ProjectPortableTextProps> = ({
	paragraphClasses,
	value,
}) => {
	const components: PortableTextComponents = useMemo(() => ({
		block: {
			normal: ({ children }) => <p className={paragraphClasses}>{children}</p>,
		},
		marks: {
			link: ({ children, value }) => (
				<a
					className="underline transition hover:opacity-50"
					href={value?.href || '#'}
					target="_blank"
					rel="noopener noreferrer"
				>
					{children}
				</a>
			),
		},
		types: {
			image: ({
				value,
			}: {
				value: Image & { alt?: string; caption?: string };
			}) => (
				<div className="my-6 space-y-2">
					<ImageBox
						image={value}
						alt={value.alt || 'Image'}
						classesWrapper="relative aspect-16/9"
					/>
					{value?.caption && (
						<div className="font-sans text-sm text-gray-600">
							{value.caption}
						</div>
					)}
				</div>
			),
		},
	}), [paragraphClasses]);

	// Protect against null or undefined value
	if (!value) {
		return null;
	}

	return <PortableText value={value} components={components} />;
};