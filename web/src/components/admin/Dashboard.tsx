/**
 * Dashboard — RSC (Server Component) wrapper.
 *
 * Payload renders this as a Server Component and passes view props that may
 * contain non-serializable values (locale objects with toString(), Payload
 * instances, etc.).  We extract ONLY plain-string data here, then pass it
 * down to the 'use client' DashboardClient.  This avoids the
 * "Functions cannot be passed to Client Components" error.
 */
import React from 'react'
import DashboardClient from './DashboardClient'

// Payload view props are loosely typed here — we only care about req.user
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Dashboard(props: any) {
  // Safely extract user from Payload's initPageResult
  const req = props?.initPageResult?.req ?? props?.req ?? null
  const user = req?.user ?? null

  // Extract only plain string/null values — nothing with functions
  const displayName: string = user?.name ?? user?.email?.split('@')[0] ?? 'Admin'

  // Resolve avatar URL: Payload populates avatar as a Media object at depth 1
  let avatarUrl: string | null = null
  const av = user?.avatar
  if (av && typeof av === 'object') {
    avatarUrl = (av as { thumbnailURL?: string | null; url?: string | null }).thumbnailURL
      ?? (av as { url?: string | null }).url
      ?? null
  }

  return <DashboardClient displayName={displayName} avatarUrl={avatarUrl} />
}
