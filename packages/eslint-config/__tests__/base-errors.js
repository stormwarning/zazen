import { bar } from './bar'
import { dirname } from 'node:path'

function q() {
	const foo = 'FOO'
	return foo + bar + dirname(import.meta.url)
}
