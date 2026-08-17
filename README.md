# GIX Nexus Digital Platform

Bilingual (English / Amharic) digital platform for **GIX Nexus Telecom and Power** —
an Ethiopian-owned telecommunications and power engineering company.

## Repository structure

```
├── app/          Next.js application (the code)
├── docs/         Project specification, governance, and source documents
├── AGENT.md      AI agent operating rules (auto-loaded every session)
└── CLAUDE.md     AI agent enforceable rule subset (auto-loaded every session)
```

## Tech stack

Next.js 15 · TypeScript · Tailwind CSS v4 · Payload CMS v3 · PostgreSQL

## Getting started

```bash
cd app
cp .env.example .env.local   # fill in DATABASE_URL and PAYLOAD_SECRET
npm install
npm run dev
```

## Documentation

All project specification, governance records, and source materials live in `docs/`.
Start with `docs/00_PROJECT_CONTROL/PROJECT-README.md`.
