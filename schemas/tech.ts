import { defineField } from 'sanity';
import { BiBriefcaseAlt2 } from 'react-icons/bi';

const tech = {
	name: 'tech',
	title: 'Tech',
	type: 'document',
	icon: BiBriefcaseAlt2,
	fields: [
		defineField({
			name: 'techName',
			title: 'Tech Name',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'comment',
			title: 'Comment',
			type: 'string',
			description: 'Short comment for this tech.',
		}),
		defineField({
			name: 'platform',
			title: 'Platform',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				list: [
					{ title: 'Mac', value: 'Mac' },
					{ title: 'Win', value: 'Win' },
					{ title: 'iOS', value: 'iOS' },
					{ title: 'Android', value: 'Android' },
					{ title: 'Web', value: 'Web' },
					{ title: 'Other', value: 'Other' },
				],
			},
		}),
		{
			name: 'techIcon',
			title: 'Tech Icon',
			type: 'image',
		},
		{
			name: 'link',
			title: 'Link',
			type: 'url',
		},
	],
};

export default tech;
