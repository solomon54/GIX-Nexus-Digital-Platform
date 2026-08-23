import { cn } from '@/lib/utils'

interface SectorCardProps {
  name: string
  description?: string
  order: number
  className?: string
}

export function SectorCard({ name, description, order, className }: SectorCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5',
        'transition-shadow duration-200 hover:shadow-md',
        className,
      )}
    >
      {/* Order badge */}
      <div className="flex items-center gap-3">
        <span
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--gix-green)]/10 text-xs font-bold text-[var(--gix-green)]"
          aria-label={`Sector ${order}`}
        >
          {String(order).padStart(2, '0')}
        </span>
        <h3 className="text-base font-semibold text-[var(--foreground)]">{name}</h3>
      </div>

      {description && (
        <p className="text-sm text-[var(--foreground-subtle)]">{description}</p>
      )}
    </div>
  )
}
