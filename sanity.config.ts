import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { copyPastePlugin } from '@superside-oss/sanity-plugin-copy-paste';
import { media } from 'sanity-plugin-media';

import { schemaTypes } from './schemas';

export default defineConfig({
	name: 'alan-ooo',
	title: 'alan.ooo',

	projectId: 'rxyp3qge',
	dataset: 'production',
	basePath: '/studio',

	plugins: [deskTool(), visionTool(), copyPastePlugin(), media()],

	schema: {
		types: schemaTypes,
	},
});
