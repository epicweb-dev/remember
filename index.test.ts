import { remember, rememberAsync, forget } from './index.js'
import { expect, test, beforeEach } from 'bun:test'

beforeEach(() => {
	// ensure global var empty before each test!
	delete globalThis.__remember_epic_web
})

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

test('rememberAsync', async () => {
	const rose = Symbol('rose')
	let returnValue = rose
	const getValue = () => Promise.resolve(returnValue)
	expect(await rememberAsync('what is in a name', getValue)).toBe(rose)
	returnValue = Symbol('bud')
	// because the name and getValue did not change, the value is remembered
	expect(await rememberAsync('what is in a name', getValue)).toBe(rose)
})

test('forget', () => {
	// nothing remembered yet, trying to forget will "fail"
	expect(forget('what is in a name')).toBe(false)
	const rose = Symbol('rose')
	let returnValue = rose
	const getValue = () => returnValue
	expect(remember('what is in a name', getValue)).toBe(rose)
	// remembered value will be found and forgotten
	expect(forget('what is in a name')).toBe(true)
	const bud = returnValue = Symbol('bud')
	// because the name has been forgotten, we should get the "new" value
	expect(remember('what is in a name', getValue)).toBe(bud)
})
