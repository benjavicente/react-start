import { TanStackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

export function Devtools() {
	return (
		<TanStackDevtools
			config={{
				position: 'bottom-left',
			}}
			plugins={[
				{
					name: 'Router',
					render: <TanStackRouterDevtoolsPanel />,
				},
				{
					name: 'Query',
					render: <ReactQueryDevtoolsPanel />,
				},
			]}
		/>
	)
}
