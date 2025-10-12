import { deepmerge } from 'deepmerge-ts'
import type { convexQuery } from '@convex-dev/react-query'

interface ConvexQueries {
	[key: string]: ReturnType<typeof convexQuery> | ConvexQueries
}

export interface ConvexQueriesRecord<Q extends ConvexQueries = ConvexQueries> {
	query: Q
}

/**
 * Helper to attach query references to the router context
 * Can't be used on SSR pages
 */
export function attachQueryFnReferences<
	Q1 extends ConvexQueries,
	Q2 extends ConvexQueries,
>(ctx: ConvexQueriesRecord<Q1>, queries: Q2) {
	return {
		query: deepmerge(ctx.query, queries),
	}
}
