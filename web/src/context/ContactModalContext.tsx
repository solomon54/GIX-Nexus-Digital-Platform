'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface ContactModalContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null)

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open  = useCallback(() => setIsOpen(true),  [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <ContactModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ContactModalContext.Provider>
  )
}

export function useContactModal(): ContactModalContextValue {
  const ctx = useContext(ContactModalContext)
  if (!ctx) throw new Error('useContactModal must be used inside ContactModalProvider')
  return ctx
}
