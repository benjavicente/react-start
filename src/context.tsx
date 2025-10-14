import type { QueryClient } from '@tanstack/react-query'
import type { ConvexReactClient } from 'convex/react'
import type { AuthClient } from '@/integrations/auth/provider'

export interface RouterContext {
	queryClient: QueryClient
	convexClient: ConvexReactClient
	auth: AuthClient
	query: {}
	mutation: {}
}
