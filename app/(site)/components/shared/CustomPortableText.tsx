import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { Image } from 'sanity';

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
	const components: PortableTextComponents = {
		block: {
			normal: ({ children }) => {
				return <p className={paragraphClasses}>{children}</p>;
			},
			h2: ({ children }) => {
				return <h2 className="text-3xl font-bold my-6">{children}</h2>;
			},
			h3: ({ children }) => {
				return <h3 className="text-2xl font-bold my-6">{children}</h3>;
			},
		},
		marks: {
			link: ({ children, value }) => {
				return (
					<Link
						className="underline transition hover:opacity-50"
						href={value?.href}
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
					<div className="my-6 space-y-2 -z-10">
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
					</div>
				);
			},
			youtube: ({ value }) => {
				const { url } = value;
				return (
					<ClientPlayer
						className="cursor-pointer"
						controls={true}
						url={url}
						light={false}
						pip={true}
					/>
				);
			},
		},
	};

	return <PortableText components={components} value={value} />;
}
