# EP Navigator — GoO Advisory & Outcomes Control Tower

**React + TypeScript + Vite** front end for EP Navigator: navigation, LOB views,
module map, and space for dashboards and governance—without a bundled cloud
backend. SharePoint and Excel remain your structured data layer; this app is
the UI layer only.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## AWS Amplify Hosting (static site only)

`amplify.yml` runs `npm ci` and `npm run build`, publishing the `dist/` folder.
No backend phase is defined in this repo.

## Repository

Remote: `https://github.com/alghotmya/GAdvisory` — default branch: `main`.

## Positioning

**EP Navigator** is a lightweight advisory workspace: outcomes, capabilities,
gaps, actions, risks, training, KPIs, and monthly governance—presented in a
clean React shell next to your existing trackers.

Tagline: *From LOB requests to measurable outcomes.*
