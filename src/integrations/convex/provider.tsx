import { ConvexReactClient } from 'convex/react'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { QueryClient } from '@tanstack/react-query'

export function createClient() {
	const convexClient = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL, {
		verbose: true,
	})

	const convexQueryClient = new ConvexQueryClient(convexClient)
	const queryClient: QueryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
			},
		},
	})

	convexQueryClient.connect(queryClient)
	return { queryClient, convexClient }
}
