import { defineField, defineType } from 'sanity';
import { Barbell } from '@phosphor-icons/react/dist/ssr';

const gear = defineType({
	name: 'gear',
	title: 'Gear',
	type: 'document',
	icon: Barbell,
	fields: [
		defineField({
			name: 'gearName',
			title: 'Gear Name',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'comment',
			title: 'Comment',
			type: 'string',
			description: 'Short comment for this gear.',
		}),
		defineField({
			name: 'gearImage',
			title: 'Gear Icon',
			type: 'image',
			description: 'Upload a gear image',
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
			name: 'link',
			title: 'Link',
			type: 'url',
		},
	],
});

export default gear;
