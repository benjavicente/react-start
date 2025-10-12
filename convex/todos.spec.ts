import { convexTest } from 'convex-test'
import { expect, test } from 'vitest'
import { api } from './_generated/api'
import schema from './schema'
import { modules } from './tests.setup'

test('sending messages', async () => {
	const t = convexTest(schema, modules)
	await t.mutation(api.todos.add, { text: 'new todo' })
	const todos = await t.query(api.todos.list)
	expect(todos).toMatchObject([{ text: 'new todo' }])
})
