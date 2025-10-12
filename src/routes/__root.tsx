import {
	HeadContent,
	Link,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router'
import appCss from '../styles.css?url'
import type { RouterContext } from '@/context'
import { Devtools } from '@/integrations/devtools'

export const Route = createRootRouteWithContext<RouterContext>()({
	notFoundComponent: NotFound,
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'TanStack Start Starter',
			},
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<Header />
				{children}
				<Devtools />
				<Scripts />
			</body>
		</html>
	)
}

function Header() {
	return (
		<header className="p-2 flex gap-2 bg-white text-black justify-between">
			<nav className="flex flex-row">
				<div className="px-2 font-bold">
					<Link to="/">Home</Link>
				</div>
				<div className="px-2 font-bold">
					<Link to="/demo/convex">Convex</Link>
				</div>
				<div className="px-2 font-bold">
					<Link to="/demo/auth">Auth</Link>
				</div>
			</nav>
		</header>
	)
}

function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold">404 Not Found</h1>
			<p className="text-lg">The page you are looking for does not exist.</p>
		</div>
	)
}
