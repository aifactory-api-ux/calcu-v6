# Architecture

## System Overview

Calcu v6 is a minimal, responsive web calculator consisting of:

- **Frontend**: React 18 SPA with TypeScript, built with Vite
- **Backend**: Node.js 20 + Express.js healthcheck service
- **Infrastructure**: Docker + docker-compose orchestration

## Component Diagram

```
┌─────────────┐      ┌─────────────┐
│   Browser   │──────│  Frontend   │
│             │      │  (React)    │
└─────────────┘      └──────┬──────┘
                             │
                       ┌─────▼─────┐
                       │  Backend  │
                       │ (Express) │
                       └─────┬─────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐
        │ PostgreSQL│  │   Redis   │  │  (future) │
        │    DB     │  │  Cache    │  │           │
        └───────────┘  └───────────┘  └───────────┘
```

## Folder Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── Calculator.tsx
│   │   │   ├── ResultDisplay.tsx
│   │   │   └── ExpressionInput.tsx
│   │   ├── hooks/
│   │   │   └── useCalculator.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── styles/
│   │       └── main.css
│   ├── public/
│   │   └── index.html
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   └── health.controller.ts
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── shared/
│   └── types.ts
├── docker-compose.yml
├── run.sh
└── README.md
```

## Deployment Flow

1. Clone repository
2. Run `./run.sh`
3. Docker Compose builds frontend and backend images
4. All containers start with healthchecks
5. Frontend accessible at http://localhost:3000

## Ports

| Service   | Internal Port | External Port |
|-----------|---------------|---------------|
| Frontend  | 3000          | 3000          |
| Backend   | 8000          | 8000          |
| PostgreSQL| 5432          | 5432          |
| Redis     | 6379          | 6379          |