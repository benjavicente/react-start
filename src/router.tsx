import { createRouter } from '@tanstack/react-router'

import * as Convex from './integrations/convex/provider'
import * as Auth from './integrations/auth/provider'

import { routeTree } from './routeTree.gen'

export const getRouter = () => {
	const { convexClient, queryClient } = Convex.createClient()
	const auth = Auth.createClient()

	return createRouter({
		routeTree,
		defaultPreload: 'intent',
		context: { convexClient, queryClient, auth, query: {} },
		Wrap: (props: { children: React.ReactNode }) => {
			return (
				<Convex.Provider convexClient={convexClient} queryClient={queryClient}>
					<Auth.Provider authClient={auth} convexClient={convexClient}>
						{props.children}
					</Auth.Provider>
				</Convex.Provider>
			)
		},
	})
}
