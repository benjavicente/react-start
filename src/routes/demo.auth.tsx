import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { Tabs } from '@base-ui-components/react/tabs'
import { convexQuery, useConvexQuery } from '@convex-dev/react-query'
import { api } from '#/convex/_generated/api'
import { extendContext } from '@/integrations/ctx'

export const Route = createFileRoute('/demo/auth')({
	ssr: false,
	component: RouteComponent,
	beforeLoad: ({ context }) =>
		extendContext(context, {
			query: {
				me: convexQuery(api.auth.getCurrentUser, {}),
			},
		}),
	loader: async ({ context: { queryClient, query } }) => {
		await Promise.allSettled([queryClient.ensureQueryData(query.me)])
	},
})

function RouteComponent() {
	const { auth } = Route.useRouteContext()
	const user = useConvexQuery(api.auth.getCurrentUser, {})

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
	})

	const loginMutation = useMutation({
		mutationFn: async ({
			email,
			password,
		}: {
			email: string
			password: string
		}) => {
			const { data, error } = await auth.signIn.email({
				email,
				password,
				callbackURL: '/dashboard',
			})
			if (error) throw new Error(error.message)
			return data
		},
	})

	const signupMutation = useMutation({
		mutationFn: async ({
			email,
			password,
			name,
		}: {
			email: string
			password: string
			name: string
		}) => {
			const { data, error } = await auth.signUp.email({
				email,
				password,
				name,
				callbackURL: '/dashboard',
			})
			if (error) throw new Error(error.message)
			return data
		},
	})

	const logoutMutation = useMutation({
		mutationFn: async () => {
			const { data, error } = await auth.signOut()
			if (error) throw new Error(error.message)
			return data
		},
	})

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()
		loginMutation.mutate({
			email: formData.email,
			password: formData.password,
		})
	}

	const handleSignup = (e: React.FormEvent) => {
		e.preventDefault()
		signupMutation.mutate({
			email: formData.email,
			password: formData.password,
			name: formData.name,
		})
	}

	const isLoading = loginMutation.isPending || signupMutation.isPending
	const error = loginMutation.error || signupMutation.error

	return (
		<main className="max-w-2xl mx-auto p-2">
			<h1 className="text-2xl font-bold mt-4 text-gray-900">
				Authentication Demo
			</h1>
			<p>Simple authentication with Better Auth and Convex.</p>

			{user ? (
				<div className="mt-4 p-4 border border-gray-200 rounded">
					<p className="mb-4">Logged in as: {user.email}</p>
					<button
						onClick={() => logoutMutation.mutate()}
						className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
					>
						Logout
					</button>
				</div>
			) : (
				<div className="mt-4">
					<Tabs.Root defaultValue="login" className="w-full">
						<Tabs.List className="flex border-b border-gray-200">
							<Tabs.Tab
								value="login"
								className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 data-[selected]:text-gray-900 data-[selected]:border-gray-900 border-b-2 border-transparent"
							>
								Login
							</Tabs.Tab>
							<Tabs.Tab
								value="signup"
								className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 data-[selected]:text-gray-900 data-[selected]:border-gray-900 border-b-2 border-transparent"
							>
								Sign Up
							</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel value="login" className="mt-4">
							<form onSubmit={handleLogin} className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Email
									</label>
									<input
										type="email"
										required
										value={formData.email}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												email: e.target.value,
											}))
										}
										className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
										placeholder="your@email.com"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700">
										Password
									</label>
									<input
										type="password"
										required
										minLength={8}
										value={formData.password}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												password: e.target.value,
											}))
										}
										className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
										placeholder="Min 8 characters"
									/>
								</div>

								{error && (
									<div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
										Error: {error.message}
									</div>
								)}

								<button
									type="submit"
									disabled={isLoading}
									className="w-full px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
								>
									{isLoading ? 'Loading...' : 'Sign In'}
								</button>
							</form>
						</Tabs.Panel>

						<Tabs.Panel value="signup" className="mt-4">
							<form onSubmit={handleSignup} className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Name
									</label>
									<input
										type="text"
										required
										value={formData.name}
										onChange={(e) =>
											setFormData((prev) => ({ ...prev, name: e.target.value }))
										}
										className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
										placeholder="Your name"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700">
										Email
									</label>
									<input
										type="email"
										required
										value={formData.email}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												email: e.target.value,
											}))
										}
										className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
										placeholder="your@email.com"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700">
										Password
									</label>
									<input
										type="password"
										required
										minLength={8}
										value={formData.password}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												password: e.target.value,
											}))
										}
										className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
										placeholder="Min 8 characters"
									/>
								</div>

								{error && (
									<div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
										Error: {error.message}
									</div>
								)}

								<button
									type="submit"
									disabled={isLoading}
									className="w-full px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
								>
									{isLoading ? 'Loading...' : 'Sign Up'}
								</button>
							</form>
						</Tabs.Panel>
					</Tabs.Root>
				</div>
			)}
		</main>
	)
}
