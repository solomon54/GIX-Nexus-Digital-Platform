import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Source: governance rules — Western digits only, both locales
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US') // Western digits always
}
