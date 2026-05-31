# AGENTS.md

## Cursor Cloud specific instructions

### Product

**momoco** (みちくさびゅあー) is a single-package Vue 3 + Quasar SPA (not a monorepo). It reads Momoiro Code 4-koma metadata from `window.pageData` (injected by an external script) and loads comic images from CDN URLs in that data. There is no backend or database in this repository.

### Standard commands

See `package.json` scripts and `README.md`:

| Task | Command |
|------|---------|
| Install | `pnpm install` (runs `quasar prepare` via `postinstall`) |
| Dev server | `pnpm dev` / `quasar dev` |
| Lint | `pnpm lint` |
| Format | `pnpm format` |
| Test | `pnpm test` (no-op placeholder) |
| Production build | `pnpm build` |

### Services

| Service | Required? | Notes |
|---------|-----------|--------|
| Quasar/Vite dev server | **Yes** | Default URL: `http://localhost:9000/` |
| `https://mo4koma.iranika.info/4komaData.js` | **Yes** (viewer/home) | Sets `window.pageData` |
| Comic image hosts (URLs inside `pageData`) | **Yes** (reading comics) | WebP paths under mo4koma CDN |
| Google Apps Script endpoints | Optional | Needed for memos, `/character`, `/search`, `/timeline` |
| `https://mo4koma.iranika.info/top/archives.json` | Optional | Custom header images |

### Dev server caveats

- **Port:** Quasar dev defaults to **9000** (see tmux/Vite “App URL” line on startup).
- **Headless / cloud agents:** `quasar.config.ts` sets `devServer.open: true`, which can open a browser during cold start and log transient “Failed to fetch dynamically imported module” errors before Vite is ready. Prefer `BROWSER=none pnpm dev` in automated environments.
- **Long-running process:** Use a tmux session (e.g. `momoco-dev`) for `pnpm dev`; do not rely on one-shot background shells.
- **Node:** `engines.node` allows `^28 \|\| ^26 \|\| ^24 \|\| ^22.12`; **pnpm >= 10** is required.

### Smoke test (hello world)

1. `pnpm install && BROWSER=none pnpm dev`
2. Open `http://localhost:9000/#/`
3. Confirm 4-koma panels render after `4komaData.js` loads (`window.pageData` in devtools).
4. Optional: use header tabs (e.g. **LATEST**) to verify routing and alternate episodes.

### PWA build

PWA mode is configured but not the default npm script: `quasar build -m pwa` if needed.
