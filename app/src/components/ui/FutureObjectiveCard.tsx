import { cn } from '@/lib/utils'

interface FutureObjectiveCardProps {
  number: string
  title: string
  description?: string
  badgeLabel: string
  className?: string
}

// CRITICAL: This card ALWAYS displays the "Objective / Planned" badge.
// Never remove or suppress the badge — source rule requires future objectives
// to be visually separated from current services at all times.
export function FutureObjectiveCard({
  number,
  title,
  description,
  badgeLabel,
  className,
}: FutureObjectiveCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-[var(--border)] border-l-4 border-l-[var(--gix-green)] bg-[var(--surface)] p-6',
        'transition-shadow duration-200 hover:shadow-md',
        className,
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Objective number */}
          <span
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--gix-green)]/10 text-sm font-bold text-[var(--gix-green)]"
            aria-label={`Objective ${number}`}
          >
            {number}
          </span>
          <h3 className="text-base font-semibold text-[var(--foreground)]">{title}</h3>
        </div>

        {/* "Objective / Planned" badge — ALWAYS visible */}
        <span
          className="flex-shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
          aria-label="This is a planned objective, not a current achievement"
        >
          {badgeLabel}
        </span>
      </div>

      {description && (
        <p className="text-sm text-[var(--foreground-subtle)]">{description}</p>
      )}
    </div>
  )
}
