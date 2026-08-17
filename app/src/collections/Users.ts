import type { CollectionConfig } from 'payload'

// CMS admin users — internal GIX Nexus staff only.
// The PUBLIC site has NO authentication. This is for the Payload admin panel only.
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    description: 'Internal CMS admin users only. Not visible to public site visitors.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Reviewer', value: 'reviewer' },
      ],
    },
  ],
}
