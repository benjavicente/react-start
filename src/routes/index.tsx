import { createFileRoute } from '@tanstack/react-router'
import { Icon } from '@/components/icon'

export const Route = createFileRoute('/')({
	component: App,
})

function App() {
	return (
		<main className="max-w-2xl mx-auto p-2">
			<h1 className="text-2xl font-bold mt-4 text-gray-900">
				React Start Template
			</h1>
			<p>Simple template to get started with fast development with React.</p>
			<h2 className="mt-4 font-bold text-xl text-gray-900">Whats included:</h2>
			<ul className="list-disc pl-4">
				<li>Tanstack Start</li>
				<li>Start and Query Devtools</li>
				<li>
					Convex as a backend with the Tanstack Query Adapter for preloading
				</li>
				<li>Simple authentication with Better Auth</li>
				<li>Styles with Tailwind CSS</li>
				<li>
					<span>Material Symbols as Icons</span>
					<Icon name="rocket" />
				</li>
				<li>Cloudflare deploy</li>
			</ul>
		</main>
	)
}
