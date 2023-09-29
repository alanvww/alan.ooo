import { BiPackage } from 'react-icons/bi';
import { defineField, defineArrayMember } from 'sanity';
import { copyPaste } from '@superside-oss/sanity-plugin-copy-paste';
import { ImageIcon } from '@sanity/icons';

const project = {
	name: 'project',
	title: 'Project',
	description: 'Project Schema',
	type: 'document',
	icon: BiPackage,
	fields: [
		defineField(copyPaste),
		{
			name: 'name',
			title: 'Name',
			type: 'string',
			description: 'Enter the name of the project',
		},
		defineField({
			name: 'overview',
			description:
				'Used both for the <meta> description tag for SEO, and project subheader.',
			title: 'Overview',
			type: 'array',
			of: [
				// Paragraphs
				defineArrayMember({
					lists: [],
					marks: {
						annotations: [],
						decorators: [
							{
								title: 'Italic',
								value: 'em',
							},
							{
								title: 'Strong',
								value: 'strong',
							},
						],
					},
					styles: [],
					type: 'block',
				}),
			],
			validation: (rule) => rule.max(155).required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description:
				'Add a custom slug for the URL or generate one from the name',
			options: { source: 'name' },
			validation: (rule) => rule.required(),
		}),
		{
			name: 'projectUrl',
			title: 'Project URL',
			type: 'url',
		},
		defineField({
			name: 'coverImage',
			title: 'Cover Image',
			type: 'image',
			description: 'Upload a cover image for this project',
			options: { hotspot: true },
			fields: [
				{
					name: 'alt',
					title: 'Alt',
					type: 'string',
				},
			],
			validation: (rule) => rule.required(),
		}),
		{
			name: 'description',
			title: 'Description',
			type: 'array',
			description: 'Write a full description about this project',
			of: [{ type: 'block' }],
		},
		defineField({
			name: 'year',
			title: 'Year',
			type: 'number',
		}),
		defineField({
			name: 'medium',
			title: 'Medium',
			type: 'string',
		}),
		defineField({
			name: 'size',
			title: 'Size',
			type: 'string',
		}),
		defineField({
			name: 'edition',
			title: 'Edition',
			type: 'string',
		}),
		defineField({
			name: 'collaboration',
			title: 'Collaboration',
			type: 'string',
		}),
		defineArrayMember({
			type: 'array',
			icon: ImageIcon,
			name: 'imagesGallery',
			title: 'Images gallery',
			of: [
				defineField({
					name: 'image',
					title: 'image',
					type: 'image',
					options: { hotspot: true },
					fields: [
						{
							name: 'alt',
							title: 'Alt',
							type: 'string',
						},
					],
				}),
			],
		}),
	],
};

export default project;
