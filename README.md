# OFF Culture Launchpad

A full-stack React web application built with TanStack Start, server-side rendered and deployed on Vercel.

## Tech Stack

- **Framework:** TanStack Start, TanStack Router, TanStack Query
- **UI:** React 19, Tailwind CSS 4, Radix UI, Framer Motion
- **Forms and validation:** React Hook Form, Zod
- **Charts:** Recharts
- **Build:** Vite, Nitro
- **Language:** TypeScript
- **Quality:** ESLint, Prettier

## Getting Started

**Prerequisites:** Node.js 20.19 or newer, and npm.

```bash
git clone https://github.com/iUmang24/OFF-LOV.git
cd OFF-LOV
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Environment Variables

If the app needs configuration, create a `.env` file in the project root. Do not commit it. Variables prefixed with `VITE_` are exposed to the browser, so never store secrets in them.
