import type { CollectionConfig } from 'payload'

// CMS admin users — internal GIX Nexus staff only.
// The PUBLIC site has NO authentication. This is for the Payload admin panel only.
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    description: 'Internal CMS admin users only. Not visible to public site visitors.',
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
  },
  fields: [
    // ── Avatar ──────────────────────────────────────────────────
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
      admin: {
        description: 'Square image recommended. JPG or PNG, max 2MB.',
        position: 'sidebar',
      },
    },
    // ── Identity ─────────────────────────────────────────────────
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      label: 'Role',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Reviewer', value: 'reviewer' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
