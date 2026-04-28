# Calcu v6

Minimalist web calculator for addition and subtraction, built with React 18 + TypeScript + Vite (frontend) and Node.js 20 + Express.js (backend), containerized with Docker.

## Prerequisites

- Docker v24.0.7+
- docker-compose v2.24.6+

## Quick Start

```bash
./run.sh
```

Access the app at http://localhost:3000

## Services

| Service   | Port | URL                     |
|-----------|------|-------------------------|
| Frontend  | 3000 | http://localhost:3000   |
| Backend   | 8000 | http://localhost:8000   |
| PostgreSQL| 5432 | localhost:5432          |
| Redis     | 6379 | localhost:6379          |

## Backend Health Check

```bash
curl http://localhost:8000/api/health
```

## Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Architecture

See [docs/architecture.md](docs/architecture.md) for system details.