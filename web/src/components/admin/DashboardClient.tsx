'use client'
/**
 * DashboardClient — Client Component.
 *
 * Receives only plain, serializable props from the RSC Dashboard wrapper.
 * No Payload locale or function objects ever reach this boundary.
 */
import React from 'react'

interface CollectionCard {
  slug: string
  label: string
  description: string
  icon: string
  fields: string[]
  category: 'content' | 'people' | 'inquiries' | 'media'
  accentColor: string
}

const COLLECTIONS: CollectionCard[] = [
  {
    slug: 'services',
    label: 'Services',
    description: 'The 6 core service offerings shown on the Services page. Control names, descriptions, capabilities, and ordering.',
    icon: '⚙️',
    fields: ['Name', 'Slug', 'Description', 'Capabilities', 'Icon', 'Order'],
    category: 'content',
    accentColor: 'rgba(0,212,255,0.14)',
  },
  {
    slug: 'sectors',
    label: 'Sectors',
    description: 'Target industry sectors GIX Nexus serves. Displayed on the Industries page.',
    icon: '🏢',
    fields: ['Name', 'Description', 'Order'],
    category: 'content',
    accentColor: 'rgba(0,180,255,0.12)',
  },
  {
    slug: 'news',
    label: 'News & Announcements',
    description: 'Company news, project updates, and press releases. Supports draft/publish workflow.',
    icon: '📰',
    fields: ['Title', 'Excerpt', 'Body', 'Cover Image', 'Category', 'Published At'],
    category: 'content',
    accentColor: 'rgba(34,211,238,0.12)',
  },
  {
    slug: 'projects',
    label: 'Projects',
    description: 'Completed and ongoing projects for the showcase. Never use specific client names.',
    icon: '📁',
    fields: ['Title', 'Excerpt', 'Category', 'Location', 'Client Sector', 'Cover Image'],
    category: 'content',
    accentColor: 'rgba(0,150,255,0.13)',
  },
  {
    slug: 'future-objectives',
    label: 'Future Objectives',
    description: 'Planned objectives shown on the Future Goals page. Always mark as "Planned".',
    icon: '🎯',
    fields: ['Number', 'Title', 'Description'],
    category: 'content',
    accentColor: 'rgba(102,0,255,0.13)',
  },
  {
    slug: 'pages',
    label: 'Pages',
    description: 'CMS-managed page content with rich text editor. Supports draft/publish workflow.',
    icon: '📄',
    fields: ['Title', 'Slug', 'Content', 'Status'],
    category: 'content',
    accentColor: 'rgba(0,200,100,0.12)',
  },
  {
    slug: 'team-members',
    label: 'Team Members',
    description: 'GIX Nexus professional staff profiles. Only publish verified, real staff members.',
    icon: '👤',
    fields: ['Name', 'Role', 'Qualification', 'Bio', 'Specializations', 'Photo'],
    category: 'people',
    accentColor: 'rgba(255,180,0,0.12)',
  },
  {
    slug: 'testimonials',
    label: 'Testimonials',
    description: 'Client and partner testimonials. Only publish verified, real statements — never fabricate.',
    icon: '💬',
    fields: ['Quote', 'Author Name', 'Author Role', 'Organisation', 'Avatar'],
    category: 'people',
    accentColor: 'rgba(0,212,180,0.12)',
  },
  {
    slug: 'service-inquiries',
    label: 'Service Inquiries',
    description: 'Inquiry form submissions from the website. Review and track lifecycle here.',
    icon: '📧',
    fields: ['Contact Name', 'Organisation', 'Service Type', 'Status', 'Message', 'Admin Notes'],
    category: 'inquiries',
    accentColor: 'rgba(255,100,100,0.12)',
  },
  {
    slug: 'media',
    label: 'Media Library',
    description: 'Uploaded images and files used across the CMS. Upload here before using elsewhere.',
    icon: '🖼️',
    fields: ['File', 'Alt Text', 'URL', 'Dimensions'],
    category: 'media',
    accentColor: 'rgba(200,100,255,0.12)',
  },
  {
    slug: 'users',
    label: 'Admin Users',
    description: 'Internal CMS admin users only. Manage staff who can access this admin panel.',
    icon: '🔐',
    fields: ['Name', 'Email', 'Role', 'Profile Photo'],
    category: 'people',
    accentColor: 'rgba(255,200,0,0.12)',
  },
]

const CATEGORY_LABELS: Record<string, string> = {
  content: '📝 Content',
  people: '👥 People',
  inquiries: '📬 Inquiries',
  media: '🗂️ Assets',
}
const CATEGORY_ORDER = ['content', 'people', 'inquiries', 'media']

interface Props {
  displayName: string
  avatarUrl: string | null
}

function CMSCard({ card }: { card: CollectionCard }) {
  return (
    <div
      className="gix-cms-card"
      style={{
        background: `linear-gradient(145deg, ${card.accentColor}, rgba(12,28,50,0.90))`,
      }}
    >
      <div className="gix-cms-card__header">
        <div className="gix-cms-card__icon" style={{ background: card.accentColor }}>
          <span style={{ fontSize: 20 }}>{card.icon}</span>
        </div>
        <span className="gix-cms-card__badge">{card.category}</span>
      </div>

      <h3 className="gix-cms-card__title">{card.label}</h3>
      <p className="gix-cms-card__desc">{card.description}</p>

      <div className="gix-cms-card__fields">
        {card.fields.map((f) => (
          <span key={f} className="gix-cms-card__field-chip">{f}</span>
        ))}
      </div>

      <div className="gix-cms-card__actions">
        <a
          href={`/admin/collections/${card.slug}`}
          className="gix-cms-card__btn gix-cms-card__btn--primary"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          Browse All
        </a>
        {card.slug !== 'service-inquiries' && (
          <a
            href={`/admin/collections/${card.slug}/create`}
            className="gix-cms-card__btn gix-cms-card__btn--secondary"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Add New
          </a>
        )}
      </div>
    </div>
  )
}

export default function DashboardClient({ displayName, avatarUrl }: Props) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    cards: COLLECTIONS.filter((c) => c.category === cat),
  }))

  return (
    <div className="gix-admin-dashboard">
      {/* ── Welcome header ── */}
      <div className="gix-admin-welcome" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        {/* Avatar */}
        <div style={{
          width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
          border: '2px solid rgba(0,212,255,0.50)',
          boxShadow: '0 0 18px rgba(0,212,255,0.28)',
          background: avatarUrl ? 'transparent' : 'linear-gradient(135deg, #0077cc, #00d4ff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ color: '#fff', fontSize: 20, fontWeight: 700, userSelect: 'none' }}>
              {displayName[0]?.toUpperCase() ?? 'A'}
            </span>
          )}
        </div>

        <div>
          <h1 className="gix-admin-welcome__greeting">
            {greeting}, {displayName} 👋
          </h1>
          <p className="gix-admin-welcome__sub">
            GIX Nexus Content Management · {new Date().toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* ── Quick links bar ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
        {[
          { label: '📧 Inquiries', href: '/admin/collections/service-inquiries' },
          { label: '📰 News', href: '/admin/collections/news' },
          { label: '📁 Projects', href: '/admin/collections/projects' },
          { label: '🖼️ Media', href: '/admin/collections/media' },
          { label: '👥 Team', href: '/admin/collections/team-members' },
          { label: '⚙️ Services', href: '/admin/collections/services' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              padding: '7px 16px',
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 500,
              background: 'rgba(0,212,255,0.07)',
              border: '1px solid rgba(0,212,255,0.18)',
              color: 'rgba(0,212,255,0.80)',
              textDecoration: 'none',
              transition: 'all 0.15s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget as HTMLAnchorElement
              t.style.background = 'rgba(0,212,255,0.16)'
              t.style.color = '#00d4ff'
              t.style.borderColor = 'rgba(0,212,255,0.40)'
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget as HTMLAnchorElement
              t.style.background = 'rgba(0,212,255,0.07)'
              t.style.color = 'rgba(0,212,255,0.80)'
              t.style.borderColor = 'rgba(0,212,255,0.18)'
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* ── Collection sections grouped by category ── */}
      {grouped.map(({ category, cards }) => (
        <div key={category} style={{ marginBottom: 40 }}>
          <h2 style={{
            fontSize: 12,
            fontWeight: 700,
            color: 'rgba(0,212,255,0.52)',
            textTransform: 'uppercase',
            letterSpacing: '0.13em',
            margin: '0 0 14px',
            paddingBottom: 8,
            borderBottom: '1px solid rgba(0,212,255,0.09)',
          }}>
            {CATEGORY_LABELS[category]}
          </h2>
          <div className="gix-admin-grid">
            {cards.map((card) => (
              <CMSCard key={card.slug} card={card} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
