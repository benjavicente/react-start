import {
	HeadContent,
	Link,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router'
import materialSymbolsFont from '@material-symbols/font-500/material-symbols-rounded.woff2?url'
import appCss from '../styles.css?url'

import type { RouterContext } from '@/context'
import { Devtools } from '@/integrations/devtools'
import { seo } from '@/utils/seo'

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			...seo({
				title: 'React Start',
				description: 'A React starter project with TanStack Start',
				url: 'https://github.com/benjavicente/react-start',
			}),
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
			{
				rel: 'preload',
				as: 'font',
				href: materialSymbolsFont,
				fetchPriority: 'high',
				crossOrigin: 'anonymous',
			},
			{
				rel: 'preconnect',
				href: import.meta.env.VITE_CONVEX_SITE_URL,
			},
		],
	}),
	notFoundComponent: NotFound,
	errorComponent: Error,
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
		<header className="p-2 bg-gray-50 text-black border-b-gray-600/50 shadow-xs">
			<nav className="flex flex-row max-w-2xl mx-auto">
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

function Error() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold">500 Internal Server Error</h1>
			<p className="text-lg">Something went wrong on our end.</p>
		</div>
	)
}
