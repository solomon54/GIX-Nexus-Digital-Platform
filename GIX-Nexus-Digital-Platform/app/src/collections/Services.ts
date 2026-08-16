import type { CollectionConfig } from 'payload'

// Source: Company Profile PDF, Page 5 — exactly 6 service groupings
// GOVERNANCE: DO NOT add a 7th service — see AGENT.md §2 hard invariants
export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    description: 'The 6 service groupings. DO NOT add a 7th — see governance rules.',
    defaultColumns: ['name', 'order', '_status'],
  },
  // Localization is configured globally in payload.config.ts
  // Individual fields use localized: true
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-safe identifier. Do not change after creation.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'capabilities',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'capability',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Lucide icon name (e.g. "Radio", "Network", "Zap")',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      min: 1,
      max: 6,
      admin: {
        description: 'Display order (1–6 only — exactly 6 services)',
      },
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
