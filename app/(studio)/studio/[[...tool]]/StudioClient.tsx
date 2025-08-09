'use client'

import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { projectId, dataset } from '../../../../sanity/env'
import { schemaTypes } from '../../../../schemas'

const config = defineConfig({
	name: 'alan-ooo',
	title: 'alan.ooo',
	projectId,
	dataset,
	basePath: '/studio',
	plugins: [
		structureTool(),
		visionTool(),
	],
	schema: {
		types: schemaTypes,
	},
})

export default function StudioClient() {
	return <NextStudio config={config} />
}
