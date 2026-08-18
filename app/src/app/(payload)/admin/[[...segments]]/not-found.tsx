import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import configPromise from '@payload-config'

type Args = {
  params?: Promise<{ segments?: string[] }>
  searchParams?: Promise<{ [key: string]: string | string[] }>
}

export default function NotFound(args: Args) {
  return NotFoundPage({
    config: configPromise,
    importMap,
    params: (args.params ?? Promise.resolve({ segments: [] })) as Promise<{ segments: string[] }>,
    searchParams: args.searchParams ?? Promise.resolve({}),
  })
}
