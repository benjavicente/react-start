import { useConvexQuery } from '@convex-dev/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ConvexClient } from 'convex/browser'
import { api } from '#/convex/_generated/api'

export const Route = createFileRoute('/')({
	component: App,
})

function Repr() {
	// Does not work
	const data = useConvexQuery(api.todos.list)
	// Works
	const [state, setState] = useState()
	useEffect(() => {
		;(async () => {
			const convex = new ConvexClient(import.meta.env.VITE_CONVEX_URL)
			const result = await convex.query(api.todos.list, {})
			setState(result)
		})()
	}, [])
	return (
		<>
			<div>Does not work: {JSON.stringify({ data })}</div>
			<div>Works: {JSON.stringify({ state })}</div>
		</>
	)
}

function App() {
	return (
		<div className="text-center">
			<header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
				<p>
					Edit <code>src/routes/index.tsx</code> and save to reload.
				</p>
				<Repr />
				<a
					className="text-[#61dafb] hover:underline"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<a
					className="text-[#61dafb] hover:underline"
					href="https://tanstack.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn TanStack
				</a>
			</header>
		</div>
	)
}
