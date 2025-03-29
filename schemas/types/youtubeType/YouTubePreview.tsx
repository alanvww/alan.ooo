'use client'

import type { PreviewProps } from 'sanity'
import { Flex, Text, Box } from '@sanity/ui'
import { useMemo } from 'react'

export function YouTubePreview(props: PreviewProps) {
	const { title: url } = props

	const id = useMemo(() => {
		if (!url || typeof url !== 'string') return null
		// Extract YouTube ID - handles various YouTube URL formats
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
		const match = url.match(regExp)
		return match && match[2].length === 11 ? match[2] : null
	}, [url])

	if (!id) {
		return (
			<Flex padding={4} justify="center">
				<Text>Add a valid YouTube URL</Text>
			</Flex>
		)
	}

	const embedUrl = `https://www.youtube.com/embed/${id}`

	return (
		<Flex padding={0} justify="center" align="center">
			<Box style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
				<iframe
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						border: 0,
					}}
					src={embedUrl}
					title="YouTube Preview"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</Box>
		</Flex>
	)
}