import { BiFile } from 'react-icons/bi';
import { defineField } from 'sanity';

const cv = {
  name: 'cv',
  title: 'CV',
  type: 'document',
  icon: BiFile,
  fields: [
    defineField({
      name: 'title',
      title: 'CV Title',
      type: 'string',
      description: 'A name for this CV (e.g., "Academic CV", "Professional CV")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description about this CV',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Add customized categories like workshops, talks, publications, etc.',
      of: [{
        type: 'object',
        fields: [
          { 
            name: 'categoryName', 
            title: 'Category Name', 
            type: 'string',
            description: 'Name of the category (e.g., "Workshops", "Talks", "Publications")',
            validation: (rule) => rule.required(),
          },
          {
            name: 'categoryDescription',
            title: 'Category Description',
            type: 'text',
            description: 'Optional description for this category',
          },
          {
            name: 'items',
            title: 'Items',
            type: 'array',
            description: 'Add items to this category',
            of: [{
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  description: 'Title of the item (e.g., paper title, workshop name)',
                  validation: (rule) => rule.required(),
                },
                {
                  name: 'date',
                  title: 'Date',
                  type: 'date',
                  description: 'When did this take place?',
                },
                {
                  name: 'endDate',
                  title: 'End Date',
                  type: 'date',
                  description: 'Optional end date (for items that span a period)',
                },
                {
                  name: 'eventName',
                  title: 'Event Name',
                  type: 'string',
                  description: 'Name of the conference, journal, venue, etc.',
                },
                {
                  name: 'location',
                  title: 'Location',
                  type: 'string',
                  description: 'Where did this take place?',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'array',
                  of: [{ type: 'block' }],
                  description: 'Additional details about this item',
                },
                {
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  description: 'Add relevant links (optional)',
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
                  name: 'images',
                  title: 'Images',
                  type: 'array',
                  description: 'Optional images related to this item',
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
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'eventName',
                  date: 'date'
                },
                prepare({ title, subtitle, date }) {
                  const dateDisplay = date ? new Date(date).getFullYear() : '';
                  return {
                    title: title || 'Untitled Item',
                    subtitle: [dateDisplay, subtitle].filter(Boolean).join(' - ')
                  };
                }
              }
            }]
          }
        ],
        preview: {
          select: {
            title: 'categoryName',
            items: 'items'
          },
          prepare({ title, items }) {
            return {
              title: title || 'Unnamed Category',
              subtitle: `${items?.length || 0} item(s)`
            };
          }
        }
      }]
    })
  ]
};

export default cv;
