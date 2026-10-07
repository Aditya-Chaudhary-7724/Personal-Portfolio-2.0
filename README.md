# Aditya Chaudhary — portfolio

Personal site: LLM and agentic systems, AI security research from Samsung PRISM, and backend work.
Live at https://personal-portfolio-2-0-rho.vercel.app/

The site is a single page with a few interactive system diagrams:

- **AI Software Engineering Agent**: a scroll-driven walkthrough of the pipeline (parse → graph + index → hybrid retrieval → LangGraph agent → Docker sandbox and test loop → LLM judge → human approval → PR).
- **Samsung PRISM guardrail**: metrics and a request-path diagram.
- **FoodBridge**: a toy ranking demo showing how the four matching signals combine, and the atomic claim RPC.
- **MovieNest**: the two-phase recommendation pipeline.

## Stack

React 18, Vite 6, Tailwind CSS 3 (colours are CSS variables, for light and dark themes) and Framer Motion. The contact form posts to Web3Forms.

## Run locally

The app lives in `Personal-Portfolio-main/` (Vercel builds from that folder).

```bash
cd Personal-Portfolio-main
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Editing content

All text, links, dates and project details are in `Personal-Portfolio-main/src/data/content.js`. Components only render what is in that file.
