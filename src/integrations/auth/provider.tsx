import { createAuthClient } from 'better-auth/react'
import {
  convexClient as convexClientPlugin,
  crossDomainClient,
} from '@convex-dev/better-auth/client/plugins'
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react'
import type { ConvexReactClient } from 'convex/react'

export function createClient() {
  const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
    plugins: [convexClientPlugin(), crossDomainClient()],
  })

  return authClient
}

export type AuthClient = ReturnType<typeof createClient>

export function Provider({
  children,
  authClient,
  convexClient,
}: {
  children: React.ReactNode
  authClient: AuthClient
  convexClient: ConvexReactClient
}) {
  return (
    <ConvexBetterAuthProvider authClient={authClient} client={convexClient}>
      {children}
    </ConvexBetterAuthProvider>
  )
}
