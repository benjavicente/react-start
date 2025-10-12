import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function createClient() {
	const CONVEX_URL = import.meta.env.VITE_CONVEX_URL
	if (typeof CONVEX_URL !== 'string') {
		console.error('missing envar CONVEX_URL')
	}
	console.log(
		'Running in:',
		typeof window === 'undefined' ? 'server' : 'client',
	)

	const convexClient = new ConvexReactClient(CONVEX_URL, {
		expectAuth: true,
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

export function Provider({
	children,
	queryClient,
	convexClient,
}: {
	children: React.ReactNode
	queryClient: QueryClient
	convexClient: ConvexReactClient
}) {
	return (
		<QueryClientProvider client={queryClient}>
			<ConvexProvider client={convexClient}>{children}</ConvexProvider>
		</QueryClientProvider>
	)
}
