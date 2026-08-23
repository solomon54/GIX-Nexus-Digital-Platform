import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  // next-intl unstable_setRequestLocale not needed here — fallback to defaults
  const t = useTranslations('common')

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-extrabold text-[var(--gix-blue)]">404</p>
      <h1 className="mt-4 text-2xl font-bold text-[var(--foreground)]">Page not found</h1>
      <p className="mt-2 text-[var(--foreground-subtle)]">
        The page you are looking for does not exist or has been moved.
      </p>
      {/* Amharic notice */}
      <p className="mt-1 text-sm text-[var(--foreground-subtle)]" lang="am">
        የሚፈልጉት ገጽ አልተገኘም
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[44px] items-center rounded-lg bg-[var(--gix-blue)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--gix-blue)]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gix-blue)] focus:ring-offset-2"
      >
        {t('backToHome')}
      </Link>
    </div>
  )
}
