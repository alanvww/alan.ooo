import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';

import { schemaTypes } from './schemas';

export default defineConfig({
	name: 'alan-ooo',
	title: 'alan.ooo',

	projectId: 'rxyp3qge',
	dataset: 'production',
	basePath: '/studio',

	plugins: [structureTool(), visionTool(), media()],

	schema: {
		types: schemaTypes,
	},
});
