import { expect, test } from 'vitest'
import { factorial } from './math'

test('sum function', () => {
	expect(factorial(3)).toBe(6)
})
