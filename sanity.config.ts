import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { lighthousePlugin } from 'sanity-lighthouse-plugin';
import { copyPastePlugin } from '@superside-oss/sanity-plugin-copy-paste';
import { media } from 'sanity-plugin-media';
import { graphiQLTool } from 'sanity-plugin-graphiql';
import { assist } from '@sanity/assist';

import { schemaTypes } from './schemas';

export default defineConfig({
	name: 'alan-ooo',
	title: 'alan.ooo',

	projectId: 'rxyp3qge',
	dataset: 'production',
	basePath: '/studio',

	plugins: [
		deskTool(),
		visionTool(),
		lighthousePlugin(),
		copyPastePlugin(),
		media(),
		graphiQLTool({ apiVersion: '2021-10-21' }),
		assist(),
	],

	schema: {
		types: schemaTypes,
	},
});
