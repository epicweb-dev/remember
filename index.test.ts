import { remember } from './index.js'
import { expect, test } from 'bun:test'

// would use mock, but... https://twitter.com/kentcdodds/status/1700718653438931049
test('remember', () => {
	const rose = Symbol('rose')
	let returnValue = rose
	const getValue = () => returnValue
	expect(remember('what is in a name', getValue)).toBe(rose)
	returnValue = Symbol('bud')
	// because the name and getValue did not change, the value is remembered
	expect(remember('what is in a name', getValue)).toBe(rose)
})
