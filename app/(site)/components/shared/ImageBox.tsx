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
	size = '(max-width:768px)100vw, 700px',
	classesWrapper,
	...props
}: ImageBoxProps) {
	const imageUrl = image && urlForImage(image)?.fit('crop').url();

	return (
		<div
			className={`w-full  overflow-hidden rounded-[3px] bg-gray-50 ${classesWrapper}`}
			data-sanity={props['data-sanity']}
		>
			{imageUrl && (
				<Image
					className="absolute h-full w-full"
					alt={alt}
					sizes={size}
					src={imageUrl}
					fill
				/>
			)}
		</div>
	);
}
