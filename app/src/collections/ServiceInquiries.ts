import type { CollectionConfig } from 'payload'

// Service Inquiry submissions — from the capabilities page inquiry form
// These appear in the Payload admin dashboard for review and response
export const ServiceInquiries: CollectionConfig = {
  slug: 'service-inquiries',
  admin: {
    useAsTitle: 'organisation',
    defaultColumns: ['organisation', 'contactName', 'serviceType', 'status', 'submittedAt'],
    description: 'Inquiry form submissions from the Capabilities page. Review and respond here.',
  },
  // No create/update from admin — submissions only via form
  // Admins can read, update status, add notes, delete
  fields: [
    // ── Contact Information ─────────────────────────────────
    {
      name: 'contactName',
      label: 'Contact Name',
      type: 'text',
      required: true,
    },
    {
      name: 'jobTitle',
      label: 'Job Title',
      type: 'text',
    },
    {
      name: 'organisation',
      label: 'Organisation',
      type: 'text',
      required: true,
    },
    {
      name: 'sector',
      label: 'Sector',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
    },
    // ── Project Information ─────────────────────────────────
    {
      name: 'serviceType',
      label: 'Service Required',
      type: 'select',
      options: [
        { label: 'Telecommunications Infrastructure', value: 'telecom-infrastructure' },
        { label: 'Fiber Optic Solutions', value: 'fiber-optic' },
        { label: 'Satellite & Wireless Communications', value: 'satellite-wireless' },
        { label: 'Network Infrastructure', value: 'network-infrastructure' },
        { label: 'Telecom Power Systems', value: 'telecom-power' },
        { label: 'Maintenance & Technical Support', value: 'maintenance' },
        { label: 'Multiple Services', value: 'multiple' },
        { label: 'Not Sure / General Inquiry', value: 'general' },
      ],
      required: true,
    },
    {
      name: 'location',
      label: 'Project Location',
      type: 'text',
      admin: { description: 'Where in Ethiopia is the project?' },
    },
    {
      name: 'timeline',
      label: 'Expected Timeline',
      type: 'select',
      options: [
        { label: 'Immediately / Urgent', value: 'urgent' },
        { label: 'Within 1 month', value: '1-month' },
        { label: '1–3 months', value: '1-3-months' },
        { label: '3–6 months', value: '3-6-months' },
        { label: 'Planning stage only', value: 'planning' },
      ],
    },
    {
      name: 'message',
      label: 'Project Details / Message',
      type: 'textarea',
    },
    // ── Admin fields ────────────────────────────────────────
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: '🆕 New', value: 'new' },
        { label: '👀 Under Review', value: 'reviewing' },
        { label: '📞 Contacted', value: 'contacted' },
        { label: '📋 Proposal Sent', value: 'proposal-sent' },
        { label: '✅ Converted', value: 'converted' },
        { label: '❌ Closed', value: 'closed' },
      ],
      admin: { description: 'Track the inquiry lifecycle here.' },
    },
    {
      name: 'adminNotes',
      label: 'Internal Notes',
      type: 'textarea',
      admin: { description: 'Internal notes — not visible to the submitter.' },
    },
    {
      name: 'submittedAt',
      label: 'Submitted At',
      type: 'date',
      admin: {
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'ipAddress',
      label: 'IP Address',
      type: 'text',
      admin: { readOnly: true, description: 'Captured at submission for audit purposes.' },
    },
  ],
}
