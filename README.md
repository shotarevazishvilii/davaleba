# Music Search — Next.js SSR/SSG

Rolling Scopes School React module: migrated music search app from Vite to **Next.js App Router**.

## Features

- iTunes music search with pagination and song details panel
- **next-intl** internationalization (English / Georgian)
- Server-side rendering for search results
- Server actions for search, refresh, and CSV export
- Static About page (server component)
- Theme toggle via React Context + localStorage
- Selected tracks flyout with server-generated CSV download

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Routes

| Route | Description |
|-------|-------------|
| `/en`, `/ka` | Home / search results |
| `/en/about`, `/ka/about` | About page (SSG) |
| Unknown routes | Localized 404 page |

## Environment

No required environment variables. Optional cache TTL was removed in favor of Next.js `fetch` revalidation.

## Branch

Task branch: `nextjs-ssr`
