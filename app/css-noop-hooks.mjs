export function resolve(specifier, context, nextResolve) {
  if (specifier.endsWith('.css') || specifier.endsWith('.scss')) {
    return { shortCircuit: true, url: 'data:text/javascript,' }
  }
  return nextResolve(specifier, context)
}

export function load(url, context, nextLoad) {
  if (url.startsWith('data:text/javascript,')) {
    return { shortCircuit: true, format: 'module', source: '' }
  }
  return nextLoad(url, context)
}
