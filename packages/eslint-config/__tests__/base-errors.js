import { bar } from './node-errors'
import { dirname } from 'node:path'

function q() {
	const foo = 'FOO'
	if (foo !== 'FOO') {
		return bar + dirname(import.meta.url)
	} else {
		return foo + bar + dirname(import.meta.url)
	}
}

export const foo = 'foo'
