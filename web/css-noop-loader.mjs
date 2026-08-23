/**
 * Node ESM hook that silently drops .css and .scss imports.
 *
 * Registered via --import flag so it runs before any module is loaded.
 * This prevents ERR_UNKNOWN_FILE_EXTENSION when Node's ESM runtime encounters
 * CSS imports in packages like react-image-crop (a dep of @payloadcms/ui).
 */
import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

register(pathToFileURL(new URL('./css-noop-hooks.mjs', import.meta.url).pathname))
