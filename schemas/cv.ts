import { defineField, defineType } from 'sanity';

const cv = defineType({
  name: 'cv',
  title: 'CV Category',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
      description: 'Name of the category (e.g., "Workshops", "Talks", "Publications")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categoryDescription',
      title: 'Category Description',
      type: 'text',
      description: 'Optional description for this category',
    }),
    defineField({
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
    })
  ],
  preview: {
    select: {
      title: 'categoryName',
      items: 'items'
    },
    prepare(selection) {
      const { title, items } = selection;
      return {
        title: title || 'Unnamed Category',
        subtitle: `${items?.length || 0} item(s)`
      };
    }
  }
});

export default cv;
