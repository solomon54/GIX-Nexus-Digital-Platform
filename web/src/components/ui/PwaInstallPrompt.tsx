'use client'

import { useState, useEffect } from 'react'
import { X, Download } from 'lucide-react'

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Check if user already dismissed or installed
    const hasDismissed = localStorage.getItem('pwa-prompt-dismissed')
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone

    if (hasDismissed || isStandalone) {
      return
    }

    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e)
      // Update UI notify the user they can install the PWA
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
      setShowPrompt(false)
    } else {
      console.log('User dismissed the install prompt')
    }
    
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-prompt-dismissed', 'true')
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 md:w-80 p-4 rounded-xl shadow-2xl bg-card border border-border/50 backdrop-blur-sm flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button 
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted text-muted-foreground transition-colors"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
      
      <div className="flex items-center gap-3 pr-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Download className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Install App</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Add to home screen for faster access and offline mode.</p>
        </div>
      </div>
      
      <div className="flex gap-2 mt-1">
        <button 
          onClick={handleDismiss}
          className="flex-1 py-1.5 px-3 text-xs font-medium text-foreground bg-muted hover:bg-muted/80 rounded-md transition-colors"
        >
          Not now
        </button>
        <button 
          onClick={handleInstall}
          className="flex-1 py-1.5 px-3 text-xs font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors shadow-sm"
        >
          Install
        </button>
      </div>
    </div>
  )
}

