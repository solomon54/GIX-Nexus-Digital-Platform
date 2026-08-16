import type { CollectionConfig } from 'payload'

// Source: Company Profile PDF, Page 10 — 8 future objectives
// CRITICAL: These are PLANNED objectives. ALWAYS displayed with "Objective / Planned" label.
// NEVER mixed with or displayed alongside current services.
export const FutureObjectives: CollectionConfig = {
  slug: 'future-objectives',
  admin: {
    useAsTitle: 'title',
    description:
      'PLANNED objectives only. Always shown with "Objective / Planned" label. Never mixed with current services.',
    defaultColumns: ['number', 'title'],
  },
  fields: [
    {
      name: 'number',
      type: 'number',
      required: true,
      min: 1,
      max: 8,
      admin: {
        description: 'Objective number (1–8) as listed in Company Profile, Page 10',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
  ],
}
