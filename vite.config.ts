/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

const config = defineConfig({
	plugins: [
		viteTsConfigPaths({
			projects: ['./tsconfig.json'],
		}),
		cloudflare({ viteEnvironment: { name: 'ssr' } }),
		tailwindcss(),
		tanstackStart({
			spa: {
				enabled: true,
			},
		}),
		viteReact(),
	],
	test: {
		environment: 'edge-runtime',
		server: { deps: { inline: ['convex-test'] } },
	},
})

export default config
