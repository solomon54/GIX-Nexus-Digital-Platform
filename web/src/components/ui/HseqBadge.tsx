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
      className={cn('flex flex-col gap-4 rounded-xl p-6', className)}
      style={{
        border: isObjective
          ? '1px solid rgba(0,212,255,0.20)'
          : '1px solid rgba(0,201,122,0.20)',
        background: isObjective
          ? 'rgba(0,212,255,0.05)'
          : 'rgba(0,201,122,0.05)',
      }}
      role="region"
      aria-label={label}
    >
      {/* Badge */}
      <span
        className="self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
        style={
          isObjective
            ? { background: 'rgba(0,212,255,0.12)', color: 'var(--accent)' }
            : { background: 'rgba(0,201,122,0.12)', color: 'var(--green)' }
        }
      >
        {badgeText}
      </span>

      {/* Heading */}
      <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>{label}</h3>

      {/* Description */}
      <p className="text-sm" style={{ color: 'var(--foreground-sub)' }}>{description}</p>
    </div>
  )
}
