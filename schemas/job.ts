import { Briefcase } from '@phosphor-icons/react/dist/ssr';

const job = {
	name: 'job',
	title: 'Job',
	type: 'document',
	icon: Briefcase,
	fields: [
		{
			name: 'name',
			title: 'Company Name',
			type: 'string',
			description: 'What is the name of the company?',
		},
		{
			name: 'jobTitle',
			title: 'Job Title',
			type: 'string',
			description: 'Enter the job title. E.g: Software Developer',
		},
		{
			name: 'logo',
			title: 'Company Logo',
			type: 'image',
		},
		{
			name: 'url',
			title: 'Company Website',
			type: 'url',
		},
		{
			name: 'location',
			title: 'Job Location',
			type: 'string',
			description: 'Where was this job located?',
		},
		{
			name: 'description',
			title: 'Job Description',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'Write a description about this role',
		},
		{
			name: 'startDate',
			title: 'Start Date',
			type: 'date',
		},
		{
			name: 'endDate',
			title: 'End Date',
			type: 'date',
		},
		{
			name: 'projectLinks',
			title: 'Project Links',
			type: 'array',
			description: 'Add links to projects related to this job',
			of: [{
				type: 'object',
				fields: [
					{ name: 'label', title: 'Label', type: 'string' },
					{ name: 'url', title: 'URL', type: 'url' }
				],
				preview: {
					select: {
						title: 'label',
						subtitle: 'url'
					}
				}
			}]
		},
		{
			name: 'projectImages',
			title: 'Project Images',
			type: 'array',
			description: 'Optional images related to this job',
			of: [{
				type: 'image',
				fields: [
					{
						name: 'alt',
						title: 'Alt Text',
						type: 'string'
					},
					{
						name: 'caption',
						title: 'Caption',
						type: 'string'
					}
				],
				options: {
					hotspot: true
				}
			}]
		},
	],
};

export default job;
