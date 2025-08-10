import { defineField, defineType } from 'sanity';

const profile = defineType({
	name: 'profile',
	title: 'Profile',
  type: 'document',
	fields: [
		defineField({
			name: 'fullName',
			title: 'Full Name',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'headline',
			title: 'Headline',
			type: 'string',
			description: 'In one short sentence, what do you do?',
		}),
		{
			name: 'profileImage',
			title: 'Profile Image',
			type: 'image',
			description: 'Upload a profile picture',
			options: { hotspot: true },
			fields: [
				{
					name: 'alt',
					title: 'Alt',
					type: 'string',
				},
			],
		},
		{
			name: 'shortBio',
			title: 'Short Bio',
			type: 'text',
			rows: 4,
		},
		{
			name: 'email',
			title: 'Email Address',
			type: 'string',
		},
		{
			name: 'location',
			title: 'Location',
			type: 'string',
		},
		{
			name: 'fullBio',
			title: 'Full Bio',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'resumeURL',
			title: 'Upload Resume',
			type: 'file',
		},
		{
			name: 'socialLinks',
			title: 'Social Links',
			type: 'object',
			description: 'Add your social media links:',
			fields: [
				{
					name: 'github',
					title: 'Github URL',
					type: 'url',
					initialValue: 'https://github.com/',
				},
				{
					name: 'linkedin',
					title: 'Linkedin URL',
					type: 'url',
					initialValue: 'https://linkedin.com/in/',
				},
				{
					name: 'instagram',
					title: 'Instagram URL',
					type: 'url',
					initialValue: 'https://instagram.com/',
				},
			],
			options: {
				collapsed: false,
				collapsible: true,
				columns: 2,
			},
		},
		defineField({
			name: 'skillCategories',
			title: 'Skills by Category',
			type: 'array',
			description: 'Add skills organized by custom categories',
			of: [{
				type: 'object',
				fields: [
					{ name: 'category', title: 'Category Name', type: 'string' },
					{ 
						name: 'skills', 
						title: 'Skills', 
						type: 'array', 
						of: [{ type: 'string' }]
					}
				],
				preview: {
					select: {
						title: 'category',
						subtitle: 'skills'
					},
					prepare({ title, subtitle }) {
						return {
							title: title || 'Unnamed Category',
							subtitle: Array.isArray(subtitle) ? subtitle.join(', ') : ''
						};
					}
				}
			}]
		}),
		defineField({
			name: 'experience',
			title: 'Work Experience',
			type: 'array',
			description: 'Add your work experiences',
			of: [{ type: 'reference', to: [{ type: 'job' }] }]
		}),
		defineField({
			name: 'cvCategories',
			title: 'CV Categories',
			type: 'array',
			description: 'Add your CV categories (workshops, talks, publications, etc.)',
			of: [{ type: 'reference', to: [{ type: 'cv' }] }]
		}),
	],
});

export default profile;
