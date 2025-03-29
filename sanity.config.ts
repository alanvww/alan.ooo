'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { webhooksTrigger } from 'sanity-plugin-webhooks-trigger'
import { projectId, dataset } from './sanity/env'
import { schemaTypes } from './schemas'

export default defineConfig({
	name: 'alan-ooo',
	title: 'alan.ooo',
	projectId,
	dataset,
	basePath: '/studio',
	plugins: [
		structureTool(),
		visionTool(),
		media(),
		webhooksTrigger({
			title: 'Project Deploy',
			text: 'Trigger a project deploy',
			// encryptionSalt: '',
		})
	],
	schema: {
		types: schemaTypes,
	},
})