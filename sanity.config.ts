import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
	name: 'alan-ooo',
	title: 'alan.ooo',

	projectId: 'rxyp3qge',
	dataset: 'production',
	basePath: '/studio',

	plugins: [deskTool(), visionTool()],

	schema: {
		types: schemaTypes,
	},
});
