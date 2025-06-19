export const TS_EXTENSIONS = ['ts', 'tsx', 'cts', 'mts']
export const JS_EXTENSIONS = ['js', 'jsx', 'mjs', 'cjs']
export const ALL_EXTENSIONS = [...JS_EXTENSIONS, ...TS_EXTENSIONS]

export const JS_FILES_GLOB = `**/*.{${JS_EXTENSIONS.join(',')}}`
export const JSX_FILES_GLOB = `**/*.jsx`

export const TS_FILES_GLOB = `**/*.{${TS_EXTENSIONS.join(',')}}`
export const TSX_FILES_GLOB = `**/*.tsx`

export const ALL_FILES_GLOB = `**/*.{${ALL_EXTENSIONS.join(',')}}`
