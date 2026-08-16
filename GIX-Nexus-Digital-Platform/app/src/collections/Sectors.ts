import type { CollectionConfig } from 'payload'

// Source: Company Profile PDF, Page 9 — 14 target-client categories
// CRITICAL: These are TARGET SECTORS (prospective), NOT existing clients.
// Display label must always be "Sectors We Serve" or "Target Industries" — never "Clients"
export const Sectors: CollectionConfig = {
  slug: 'sectors',
  admin: {
    useAsTitle: 'name',
    description:
      'Target sectors (prospective). NOT existing clients — display as "Sectors We Serve".',
    defaultColumns: ['name', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      min: 1,
      max: 14,
      admin: {
        description: 'Display order (1–14)',
      },
    },
  ],
}
