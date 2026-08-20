import type { CollectionConfig } from 'payload'

// Team Members — GIX Nexus professional staff
// Source: Company Profile PDF, Page 8 — documented role types
export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order', '_status'],
    description: 'GIX Nexus professional staff profiles. Only publish verified, real staff members.',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'e.g. "Managing Director", "Fiber Optic Technician"' },
    },
    {
      name: 'qualification',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "Cisco Certified Network Professional", "SATCOM specialist"' },
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
      admin: { description: 'Short professional summary (2-3 sentences).' },
    },
    {
      name: 'specializations',
      type: 'array',
      localized: true,
      fields: [{ name: 'item', type: 'text' }],
      admin: { description: 'Key technical skills / areas of expertise.' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 99,
      admin: { description: 'Display order — Managing Director should be 1.' },
    },
    {
      name: '_status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      required: true,
    },
  ],
}
