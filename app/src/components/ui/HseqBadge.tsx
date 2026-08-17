import { cn } from '@/lib/utils'

type HseqBadgeVariant = 'objective' | 'policy'

interface HseqBadgeProps {
  label: string
  description: string
  badgeText: string
  variant: HseqBadgeVariant
  className?: string
}

// Source: Company Profile PDF, Page 8
// Zero Accident is an OBJECTIVE/COMMITMENT — never a reported metric
// 100% Safety-First is a POLICY STATEMENT — never a historical performance claim
export function HseqBadge({
  label,
  description,
  badgeText,
  variant,
  className,
}: HseqBadgeProps) {
  const isObjective = variant === 'objective'

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-xl border-2 p-6',
        isObjective
          ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5'
          : 'border-[var(--brand-green)] bg-[var(--brand-green)]/5',
        className,
      )}
      role="region"
      aria-label={label}
    >
      {/* Badge */}
      <span
        className={cn(
          'self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
          isObjective
            ? 'bg-[var(--brand-blue)]/15 text-[var(--brand-blue)]'
            : 'bg-[var(--brand-green)]/15 text-[var(--brand-green)]',
        )}
      >
        {badgeText}
      </span>

      {/* Heading */}
      <h3 className="text-xl font-bold text-[var(--foreground)]">{label}</h3>

      {/* Description */}
      <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
    </div>
  )
}
