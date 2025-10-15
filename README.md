# React Start Template

A template to build fast with React.

```sh
pnpm dev
```

## Philosophy of the template

- Prefer SPA (`ssr: false`) but use SSR on landing pages
- Keep it simple: start with the minimal setup to start, add complexity when needed
- Avoid unrelated but required problems, like auth

## Setup

It's recomended that you have Corepack enabled:

```sh
npm i -g corepack@latest && corepack enable
```

Run this commands when stating the Convex instance:

```sh
# https://convex-better-auth.netlify.app/framework-guides/react
# add the --prod flag to add those to production
pnpm exec convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
pnpm exec convex env set SITE_URL http://localhost:3000
```

Add the convex URLs to the `env.local`.

```env
VITE_CONVEX_URL=https://{replace}.convex.cloud
VITE_CONVEX_SITE_URL=https://{replace}.convex.site
```

Optionally do the same for `env.production.local` for a Convex production environment.

## Deployment

I fully recomend using Convex development environment to get started,
and change it to a production environment when ready.

If you are deploying with a production environment,
remember to set different environment variables on the Convex instance.

```sh
pnpm run deploy

# First time deploying might require an interactive setup
# Run this on the first time
pnpm run deploy:cloudflare
```

## Chore utilities

```sh
pnpm update --latest --interactive
```

## Future

- This uses the experimental rolldown-vite. It is a x2 speed bump, but might have some issues. You can disable it by comenting the override on the pnpm settings and re-installing the dependencies.
- Update dependencies on non v1 status: Tanstack Start, BaseUI
- Improve the formatter + linter setup
