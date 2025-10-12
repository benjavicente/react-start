import { createClient } from '@convex-dev/better-auth'
import { convex, crossDomain } from '@convex-dev/better-auth/plugins'
import { betterAuth } from 'better-auth'

import { components } from './_generated/api'
import { query } from './_generated/server'
import type { GenericCtx } from '@convex-dev/better-auth'
import type { DataModel } from './_generated/dataModel'

const siteUrl = process.env.SITE_URL!

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth)

export const createAuth = (
	ctx: GenericCtx<DataModel>,
	{ optionsOnly } = { optionsOnly: false },
) => {
	return betterAuth({
		logger: {
			disabled: optionsOnly,
		},
		trustedOrigins: [siteUrl],
		database: authComponent.adapter(ctx),
		// Configure simple, non-verified email/password to get started
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: false,
		},
		plugins: [crossDomain({ siteUrl }), convex()],
	})
}

export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => {
		const user = await authComponent.safeGetAuthUser(ctx)
		return user
	},
})
