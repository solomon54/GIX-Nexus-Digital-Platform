import type { CollectionConfig } from 'payload'

// Testimonials — from clients and partners
// GOVERNANCE: Never fabricate testimonials. Only publish real, verified statements.
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'organisation', '_status'],
    description: 'Client and partner testimonials. Only publish verified, real statements. Never fabricate.',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Verbatim quote from the client or partner.' },
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      admin: { description: 'Full name of the person giving the testimonial.' },
    },
    {
      name: 'authorRole',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "Project Manager" or "Head of IT"' },
    },
    {
      name: 'organisation',
      type: 'text',
      localized: true,
      admin: { description: 'Organisation name — only if authorized to publish.' },
    },
    {
      name: 'sector',
      type: 'text',
      localized: true,
      admin: { description: 'Sector category if organisation name cannot be published.' },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: '_status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
    },
  ],
}
