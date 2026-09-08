import type { CollectionConfig } from 'payload'

// Source: Company Profile PDF — 8 service domains
export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    description: 'The 8 service domains. Slugs must match constants.ts SERVICE_SLUGS exactly.',
    defaultColumns: ['name', 'order', '_status'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Service Info & Capabilities',
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
          ],
        },
        {
          label: 'Configuration & Settings',
          fields: [
            {
              name: 'slug',
              type: 'select',
              required: true,
              unique: true,
              options: [
                { label: 'Telecommunications Infrastructure', value: 'telecommunications-infrastructure' },
                { label: 'Fiber Optic Solutions', value: 'fiber-optic-solutions' },
                { label: 'Satellite & Wireless Communications', value: 'satellite-wireless-communications' },
                { label: 'RF Engineering', value: 'rf-engineering' },
                { label: 'Network Infrastructure', value: 'network-infrastructure' },
                { label: 'Telecom Power Systems', value: 'telecom-power-systems' },
                { label: 'SMATV / MATV Solutions', value: 'smatv-matv-solutions' },
                { label: 'Maintenance & Technical Support', value: 'maintenance-technical-support' },
              ],
              admin: {
                description: 'Must match the URL slug. Do not change after creation.',
              },
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Lucide icon name (e.g. "Radio", "Network", "Zap", "Tv")',
              },
            },
            {
              name: 'order',
              type: 'number',
              required: true,
              min: 1,
              max: 8,
              admin: {
                description: 'Display order (1–8)',
              },
            },
          ],
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
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
