# AI Testing Agent Web

Online interactive demo and portfolio frontend for the [AI Agent Automated Testing Platform](https://github.com/Augensternsy/ai-testing-agent).

## Screenshot

> Screenshot placeholder — deploy and capture the landing page.

## Architecture

```
src/
├── components/
│   ├── Navbar.tsx          # Top navigation with GitHub link
│   ├── Hero.tsx            # Landing hero with Run Demo button
│   ├── Metrics.tsx         # Verified project metrics cards
│   ├── Pipeline.tsx        # Five-stage architecture diagram
│   ├── DemoPanel.tsx       # Interactive demo console
│   ├── StageProgress.tsx   # Pipeline stage animation
│   ├── TestCasesTable.tsx  # Generated test cases table
│   ├── CodeViewer.tsx      # PyTest code viewer with copy
│   ├── TestReport.tsx      # Execution report with progress bar
│   ├── AgentAnalysis.tsx   # Failure analysis + repair example
│   └── SafetySection.tsx   # Safe repair guardrails
├── services/
│   └── api.ts              # Unified API client (fetch layer)
├── types/
│   └── testing.ts          # TypeScript interfaces (no `any`)
├── data/
│   └── demoRun.ts          # Verified showcase data (sanitized)
├── styles/
│   └── global.css          # Dark developer-tool theme
├── App.tsx
└── main.tsx
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_API_BASE_URL` | No | Backend demo service URL. If unset or unreachable, the app runs in Showcase Mode. |

**Never** configure `OPENAI_API_KEY` or any LLM API key in this frontend project.

## Showcase Mode

When `VITE_API_BASE_URL` is not set or the backend health check fails, the app
automatically switches to **Showcase Mode**. A banner is displayed at the top
of the demo panel indicating the backend is offline and a verified example run
is being shown.

The showcase data comes from a real DeepSeek E2E run (2026-09-23) stored in
`src/data/demoRun.ts`. It is clearly labeled as a verified example, not a live
result.

## Live Mode

When `VITE_API_BASE_URL` points to a running backend and the health check
(`GET /api/health`) succeeds, the app enters **Live Mode**. The badge switches
to green "LIVE" and all demo requests hit the real backend.

If a live request fails, the app gracefully falls back to Showcase Mode.

### Backend API Contract

```
GET  /api/health            → { "status": "ok" }
GET  /api/demo/scenarios    → { "scenarios": [...] }
POST /api/demo/run          → { "run_id", "mode", "stages", "test_cases", ... }
```

See `src/types/testing.ts` for the full TypeScript contract.

## Vercel Deployment

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Set `VITE_API_BASE_URL` in Vercel Environment Variables (optional)
4. Deploy — Vercel auto-detects Vite

No additional build configuration needed.

## Backend Repository

**https://github.com/Augensternsy/ai-testing-agent**

The backend is an independent Python project. This frontend does not modify it.
