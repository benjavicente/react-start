import { useCallback, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { convexQuery, useConvexMutation } from '@convex-dev/react-query'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import type { Id } from '#/convex/_generated/dataModel'
import { api } from '#/convex/_generated/api'
import { extendContext } from '@/integrations/ctx'
import { Icon } from '@/components/icon'

export const Route = createFileRoute('/demo/convex')({
	component: ConvexTodos,
	ssr: false,
	beforeLoad: ({ context }) =>
		extendContext(context, {
			query: {
				todos: {
					list: convexQuery(api.todos.list, {}),
				},
			},
		}),
	loader: async ({ context: { queryClient, query } }) => {
		await Promise.allSettled([queryClient.ensureQueryData(query.todos.list)])
	},
})

function ConvexTodos() {
	const { query } = Route.useRouteContext()

	const todos = useSuspenseQuery(query.todos.list)
	const addTodo = useMutation({
		mutationFn: useConvexMutation(api.todos.add),
	})
	const toggleTodo = useMutation({
		mutationFn: useConvexMutation(api.todos.toggle),
	})
	const removeTodo = useMutation({
		mutationFn: useConvexMutation(api.todos.remove),
	})

	const [newTodo, setNewTodo] = useState('')

	const handleAddTodo = useCallback(async () => {
		if (newTodo.trim()) {
			await addTodo.mutate({ text: newTodo.trim() })
			setNewTodo('')
		}
	}, [addTodo, newTodo])

	const handleToggleTodo = useCallback(
		async (id: string) => {
			await toggleTodo.mutate({ id: id as Id<'todos'> })
		},
		[toggleTodo],
	)

	const handleRemoveTodo = useCallback(
		async (id: string) => {
			await removeTodo.mutate({ id: id as Id<'todos'> })
		},
		[removeTodo],
	)

	const completedCount = todos.data.filter((todo) => todo.completed).length || 0
	const totalCount = todos.data.length || 0

	return (
		<main className="max-w-2xl mx-auto p-2">
			<h1 className="text-2xl font-bold mt-4 text-gray-900">Convex Todos</h1>
			<p>A simple todo app using Convex as the backend.</p>

			<div className="mt-4">
				<p>
					Total: {totalCount} | Completed: {completedCount}
				</p>
			</div>

			<div className="flex gap-2 mt-4">
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleAddTodo()
						}
					}}
					placeholder="What needs to be done?"
					className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
				/>
				<button
					onClick={handleAddTodo}
					disabled={!newTodo.trim()}
					className="px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					Add
				</button>
			</div>

			<ul className="mt-4 space-y-2">
				{todos.data.map((todo) => (
					<li
						key={todo._id}
						className="flex items-center gap-3 p-2 border border-gray-200 rounded"
					>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => handleToggleTodo(todo._id)}
							className="rounded"
						/>
						<span
							className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
						>
							{todo.text}
						</span>
						<button
							onClick={() => handleRemoveTodo(todo._id)}
							className="text-red-500 hover:text-red-700"
						>
							<Icon name="delete" />
						</button>
					</li>
				))}
			</ul>
		</main>
	)
}
