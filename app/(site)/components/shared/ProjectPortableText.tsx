import { PortableTextBlock } from '@portabletext/types';
import { FC } from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import ImageBox from './ImageBox'; // Ensure this component is properly defined
import type { Image } from 'sanity';

interface ProjectPortableTextProps {
	paragraphClasses?: string;
	value: PortableTextBlock[]; // Assuming this comes from your Sanity dataset
}

interface ImageBoxProps {
	image: Image & { alt?: string; caption?: string };
	alt?: string;
	classesWrapper?: string;
}

export const ProjectPortableText: FC<ProjectPortableTextProps> = ({
	paragraphClasses,
	value,
}) => {
	const components: PortableTextComponents = {
		block: {
			normal: ({ children }) => <p className={paragraphClasses}>{children}</p>,
		},
		marks: {
			link: ({ children, value }) => (
				<a
					className="underline transition hover:opacity-50"
					href={value.href}
					target="_blank" // Added for security and usability
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
						classesWrapper="relative aspect-[16/9]"
					/>
				</div>
			),
		},
	};

	return <PortableText value={value} components={components} />;
};
