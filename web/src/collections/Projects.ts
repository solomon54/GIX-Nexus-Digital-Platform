import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Projects — past and current work GIX Nexus has delivered
// Source: Company Profile PDF context — "Reliable Project Delivery" (Page 9)
export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'serviceCategory', 'location', '_status'],
    description: 'Completed and ongoing projects. Never invent client names — use sector categories only unless explicitly provided.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'e.g. "Fiber Optic Network Deployment — Addis Ababa"' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: { description: 'Short description for the showcase card.' },
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor(),
      localized: true,
    },
    {
      name: 'serviceCategory',
      type: 'select',
      options: [
        { label: 'Telecommunications Infrastructure', value: 'telecom-infrastructure' },
        { label: 'Fiber Optic Solutions', value: 'fiber-optic' },
        { label: 'Satellite & Wireless', value: 'satellite-wireless' },
        { label: 'Network Infrastructure', value: 'network-infrastructure' },
        { label: 'Telecom Power Systems', value: 'telecom-power' },
        { label: 'Maintenance & Support', value: 'maintenance' },
      ],
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "Addis Ababa, Ethiopia" or "Across Ethiopia"' },
    },
    {
      name: 'clientSector',
      type: 'text',
      localized: true,
      admin: {
        description: 'Sector category only — do NOT use specific client names without authorization. e.g. "Government Ministry" or "Telecom Operator"',
      },
    },
    {
      name: 'completedAt',
      type: 'date',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
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
