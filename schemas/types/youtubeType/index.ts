// schemas/types/youtubeType/index.ts
import { defineType, defineField } from 'sanity'
import { PlayIcon } from '@sanity/icons'
import { YouTubePreview } from './YouTubePreview'

export const youtube = defineType({
	name: 'youtube',
	type: 'object',
	title: 'YouTube Embed',
	icon: PlayIcon,
	fields: [
		defineField({
			name: 'url',
			type: 'url',
			title: 'YouTube video URL',
			validation: rule => rule.required().uri({
				scheme: ['http', 'https']
			})
		}),
	],
	preview: {
		select: {
			title: 'url'
		}
	},
	components: {
		preview: YouTubePreview
	}
})