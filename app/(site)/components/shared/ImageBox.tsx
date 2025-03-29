import Image from 'next/image';

import { urlForImage } from '../../../../sanity/sanity.image';

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
	const imageUrl = image && urlForImage(image)?.fit('crop').url();

	console.log('Image URL:', props.width);

	return (
		<div
			className={`w-full p-0 overflow-hidden  bg-transparent ${classesWrapper}`}
			data-sanity={props['data-sanity']}
		>
			{imageUrl && (
				<Image
					className="w-full h-auto p-0 m-0 object-cover rounded-xl"
					alt={alt}
					sizes={size}
					src={imageUrl}
					loading="lazy"
					fill
				/>
			)}
		</div>
	);
}
