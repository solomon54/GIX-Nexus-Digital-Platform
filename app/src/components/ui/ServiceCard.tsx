'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  name: string
  description?: string
  capabilities?: string[]
  icon?: string
  slug: string
  locale: string
  className?: string
}

// Icon map using inline SVG paths to avoid dynamic Lucide imports
const iconPaths: Record<string, string> = {
  Tower:
    'M12 2L8 6H4v2h1.5l.5 10H6l-1 4h14l-1-4h-.5l.5-10H20V6h-4L12 2zm0 2.5L14.5 6h-5L12 4.5zM9.5 8h5l-.5 10h-4L9.5 8z',
  Cable: 'M4 9h16M4 15h16M9 3v18M15 3v18',
  Radio:
    'M4.9 4.9C3.7 6.1 3 7.8 3 9.5a6.5 6.5 0 0 0 6.5 6.5c1.7 0 3.4-.7 4.6-1.9M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0M19.1 4.9A9.5 9.5 0 0 1 21 9.5M12 12l7-7',
  Network:
    'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18',
  Zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  Wrench:
    'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
}

function ServiceIcon({ name, className }: { name?: string; className?: string }) {
  const path = iconPaths[name ?? ''] ?? iconPaths['Wrench']
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-6 w-6', className)}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  )
}

export function ServiceCard({
  name,
  description,
  capabilities,
  icon,
  slug,
  locale,
  className,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6',
        'transition-shadow duration-200 hover:shadow-lg',
        className,
      )}
    >
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--brand-blue)]/10 text-[var(--brand-blue)]">
        <ServiceIcon name={icon} className="h-6 w-6" />
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-[var(--foreground)]">{name}</h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-[var(--muted-foreground)] line-clamp-3">{description}</p>
      )}

      {/* Capabilities list */}
      {capabilities && capabilities.length > 0 && (
        <ul className="mt-auto flex flex-col gap-1.5">
          {capabilities.slice(0, 3).map((cap, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
              <span
                className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-blue)]"
                aria-hidden="true"
              />
              {cap}
            </li>
          ))}
          {capabilities.length > 3 && (
            <li className="text-sm text-[var(--muted-foreground)]">
              +{capabilities.length - 3} more
            </li>
          )}
        </ul>
      )}

      {/* Learn more link */}
      <Link
        href={`/${locale}/services/${slug}`}
        className="mt-2 inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-[var(--brand-blue)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:ring-offset-2 rounded"
        aria-label={`Learn more about ${name}`}
      >
        Learn more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
