import { createRouter } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react'

import * as Convex from './integrations/convex/provider'
import * as Auth from './integrations/auth/provider'

import { routeTree } from './routeTree.gen'

export const getRouter = () => {
	const { convexClient, queryClient } = Convex.createClient()
	const auth = Auth.createClient()

	return createRouter({
		routeTree,
		defaultPreload: 'intent',
		// Disable that the pending component should
		// have a minimun time been displayed
		defaultPendingMinMs: 0,
		defaultPendingMs: 1000,
		context: {
			convexClient,
			queryClient,
			auth,
			query: {},
			mutation: {},
		},

		Wrap: (props) => {
			return (
				<QueryClientProvider client={queryClient}>
					<ConvexBetterAuthProvider authClient={auth} client={convexClient}>
						{props.children}
					</ConvexBetterAuthProvider>
				</QueryClientProvider>
			)
		},
	})
}
