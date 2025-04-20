import Image from 'next/image';

import { urlForImage } from '@/sanity/sanity.image';


interface ImageBoxProps {
	image?: { asset?: any };
	alt?: string;
	width?: number;
	height?: number;
	size?: string;
	classesWrapper?: string;
	'data-sanity'?: string;
}

export default function ImageBox({
	image,
	alt = 'Cover image',
	size = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw',
	classesWrapper,
	...props
}: ImageBoxProps) {
	const imageUrl = image && urlForImage(image)?.auto('format').url();

	return (
		<div
			className={`w-full p-0 overflow-hidden  bg-transparent ${classesWrapper}`}
			data-sanity={props['data-sanity']}
		>
			{imageUrl && (
				<Image
					className="p-0 m-0 rounded-xl"
					alt={alt}
					width={0} // Required for responsive sizing with style
					height={0} // Required for responsive sizing with style
					sizes={size}
					src={imageUrl}
					loading="lazy"
					style={{ width: '100%', height: 'auto' }} // Let image determine height based on width
				/>
			)}
		</div>
	);
}
