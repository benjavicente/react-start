import type { QueryClient } from '@tanstack/react-query'
import type { ConvexReactClient } from 'convex/react'
import type { AuthClient } from '@/integrations/auth/provider'
import type { ConvexQueriesRecord } from '@/integrations/convex/queries'

export interface RouterContext extends ConvexQueriesRecord {
	queryClient: QueryClient
	convexClient: ConvexReactClient
	auth: AuthClient
}
