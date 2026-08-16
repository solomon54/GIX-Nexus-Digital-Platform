import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'

export default function NotFound() {
  return NotFoundPage({ importMap })
}
