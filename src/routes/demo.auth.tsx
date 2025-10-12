import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { convexQuery, useConvexQuery } from '@convex-dev/react-query'
import { api } from '#/convex/_generated/api'
import { attachQueryFnReferences } from '@/integrations/convex/queries'

export const Route = createFileRoute('/demo/auth')({
	component: RouteComponent,
	beforeLoad: ({ context }) =>
		attachQueryFnReferences(context, {
			me: convexQuery(api.auth.getCurrentUser, {}),
		}),
	loader: async ({ context: { queryClient, query } }) => {
		await Promise.allSettled([queryClient.ensureQueryData(query.me)])
	},
})

function RouteComponent() {
	const { auth } = Route.useRouteContext()

	const user = {
		data: useConvexQuery(api.auth.getCurrentUser, {}),
	}

	const [isLogin, setIsLogin] = useState(true)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
		image: '',
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
			if (error) {
				console.error('Login failed:', error)
			}
			return data
		},
	})

	// Signup mutation
	const signupMutation = useMutation({
		mutationFn: async ({
			email,
			password,
			name,
			image,
		}: {
			email: string
			password: string
			name: string
			image?: string
		}) => {
			const { data, error } = await auth.signUp.email({
				email,
				password,
				name,
				image,
				callbackURL: '/dashboard',
			})
			if (error) {
				console.error('Signup failed:', error)
			}
			return data
		},
	})

	const logoutMutation = useMutation({
		mutationFn: async () => {
			const { data, error } = await auth.signOut()
			if (error) {
				console.error('Logout failed:', error)
			}
			return data
		},
	})

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (isLogin) {
			loginMutation.mutate({
				email: formData.email,
				password: formData.password,
			})
		} else {
			signupMutation.mutate({
				email: formData.email,
				password: formData.password,
				name: formData.name,
				image: formData.image,
			})
		}
	}

	const isLoading = loginMutation.isPending || signupMutation.isPending

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						{isLogin ? 'Sign in to your account' : 'Create your account'}
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Authentication Demo
					</p>
				</div>

				<div className="bg-white py-8 px-6 shadow-lg rounded-lg">
					{/* Tab switcher */}
					<div className="flex mb-6">
						<button
							type="button"
							className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-lg border ${
								isLogin
									? 'bg-indigo-50 border-indigo-500 text-indigo-700'
									: 'bg-gray-50 border-gray-300 text-gray-500 hover:text-gray-700'
							}`}
							onClick={() => setIsLogin(true)}
						>
							Login
						</button>
						<button
							type="button"
							className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-lg border-l-0 border ${
								!isLogin
									? 'bg-indigo-50 border-indigo-500 text-indigo-700'
									: 'bg-gray-50 border-gray-300 text-gray-500 hover:text-gray-700'
							}`}
							onClick={() => setIsLogin(false)}
						>
							Sign Up
						</button>
					</div>

					<form className="space-y-6" onSubmit={handleSubmit}>
						{/* Name field - only for signup */}
						{!isLogin && (
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Full Name
								</label>
								<input
									id="name"
									name="name"
									type="text"
									required={!isLogin}
									value={formData.name}
									onChange={handleInputChange}
									className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Enter your full name"
								/>
							</div>
						)}

						{/* Email field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email Address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={formData.email}
								onChange={handleInputChange}
								className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Enter your email"
							/>
						</div>

						{/* Password field */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								value={formData.password}
								onChange={handleInputChange}
								className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Enter your password (min 8 characters)"
								minLength={8}
							/>
						</div>

						{/* Image URL field - only for signup */}
						{!isLogin && (
							<div>
								<label
									htmlFor="image"
									className="block text-sm font-medium text-gray-700"
								>
									Profile Image URL (Optional)
								</label>
								<input
									id="image"
									name="image"
									type="url"
									value={formData.image}
									onChange={handleInputChange}
									className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="https://example.com/avatar.jpg"
								/>
							</div>
						)}

						{/* Error messages */}
						{(loginMutation.error || signupMutation.error) && (
							<div className="bg-red-50 border border-red-200 rounded-md p-4">
								<div className="flex">
									<div className="ml-3">
										<h3 className="text-sm font-medium text-red-800">
											{isLogin ? 'Login failed' : 'Signup failed'}
										</h3>
										<div className="mt-2 text-sm text-red-700">
											{(loginMutation.error || signupMutation.error)?.message ||
												'An error occurred'}
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Success messages */}
						{(loginMutation.isSuccess || signupMutation.isSuccess) && (
							<div className="bg-green-50 border border-green-200 rounded-md p-4">
								<div className="flex">
									<div className="ml-3">
										<h3 className="text-sm font-medium text-green-800">
											{isLogin
												? 'Login successful!'
												: 'Account created successfully!'}
										</h3>
										<div className="mt-2 text-sm text-green-700">
											{isLogin
												? 'Redirecting to dashboard...'
												: 'Please check your email to verify your account.'}
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Submit button */}
						<div>
							<button
								type="submit"
								disabled={isLoading}
								className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
									isLoading
										? 'bg-gray-400 cursor-not-allowed'
										: 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								}`}
							>
								{isLoading ? (
									<>
										<svg
											className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										{isLogin ? 'Signing in...' : 'Creating account...'}
									</>
								) : (
									<>{isLogin ? 'Sign in' : 'Create account'}</>
								)}
							</button>
						</div>
					</form>

					{/* Additional info */}
					<div className="mt-6 text-center">
						<p className="text-xs text-gray-500">
							This is a demo authentication form. The authClient API calls are
							mocked.
						</p>
					</div>
				</div>
				<button
					type="button"
					className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					onClick={() => logoutMutation.mutate()}
				>
					Logout
				</button>
				{user.data && (
					<div className="mt-6 text-center">
						<p className="text-xs text-gray-500">
							Logged in as {user.data.email}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
