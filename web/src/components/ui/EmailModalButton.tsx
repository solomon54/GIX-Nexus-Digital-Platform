'use client'

import { useContactModal } from '@/context/ContactModalContext'

interface EmailModalButtonProps {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

/**
 * Drop-in replacement for <a href="mailto:..."> anywhere on the site.
 * Opens the QuickContactModal instead of launching a mail app.
 */
export function EmailModalButton({ className, children, style }: EmailModalButtonProps) {
  const { open } = useContactModal()
  return (
    <button
      type="button"
      onClick={open}
      className={className}
      style={style}
    >
      {children ?? 'gixnexustelecom@gmail.com'}
    </button>
  )
}
