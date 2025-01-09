import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

const imageBuilder = createImageUrlBuilder({
	projectId: 'rxyp3qge',
	dataset: 'production',
});

export const urlForImage = (source: Image) => {
	// Ensure that source image contains a valid reference
	if (!source?.asset?._ref) {
		return undefined;
	}

	return imageBuilder?.image(source).auto('format').fit('max');
};
