import { defineField } from 'sanity';
import { BiDumbbell } from 'react-icons/bi';

const gear = {
	name: 'gear',
	title: 'Gear',
	type: 'document',
	icon: BiDumbbell,
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
};

export default gear;
