import { createAuthClient } from 'better-auth/react'
import {
	convexClient as convexClientPlugin,
	crossDomainClient,
} from '@convex-dev/better-auth/client/plugins'

export function createClient() {
	const authClient = createAuthClient({
		baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
		plugins: [convexClientPlugin(), crossDomainClient()],
	})

	return authClient
}

export type AuthClient = ReturnType<typeof createClient>
