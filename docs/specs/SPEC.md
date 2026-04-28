# SPEC.md

## 1. TECHNOLOGY STACK

- **Backend**
  - Node.js v20.11.1
  - Express.js v4.18.2
  - PostgreSQL v15
  - Redis v7.2 (for caching)
  - jsonwebtoken v9.0.2 (JWT validation)
  - dotenv v16.3.1
  - pg v8.11.1 (PostgreSQL client)
- **Frontend**
  - React v18.2.0
  - TypeScript v5.4.2
  - Vite v5.2.0 (build tool)
  - axios v1.6.7 (HTTP client)
- **Infrastructure**
  - Docker v24.0.7
  - docker-compose v2.24.6
  - AWS ECS (Fargate launch type)
  - GitHub Actions (CI/CD)
- **Testing**
  - Jest v29.7.0 (backend and frontend)
  - React Testing Library v14.2.0

---

## 2. DATA CONTRACTS

### Backend (TypeScript interfaces)

```typescript
// Calculation request payload
export interface CalculationRequest {
  expression: string; // e.g., "2+2-1"
}

// Calculation response payload
export interface CalculationResponse {
  result: number; // e.g., 3
  expression: string; // e.g., "2+2-1"
  cached: boolean; // true if result was served from cache
}

// Error response
export interface ErrorResponse {
  error: string;
  message: string;
}

// JWT payload (for Auth Service)
export interface JWTPayload {
  userId: string;
  exp: number;
}

// Calculation record (DB)
export interface CalculationRecord {
  id: string;
  userId: string;
  expression: string;
  result: number;
  createdAt: string; // ISO 8601
}
```

### Frontend (TypeScript interfaces)

```typescript
// Calculation request payload
export interface CalculationRequest {
  expression: string;
}

// Calculation response payload
export interface CalculationResponse {
  result: number;
  expression: string;
  cached: boolean;
}

// Error response
export interface ErrorResponse {
  error: string;
  message: string;
}
```

---

## 3. API ENDPOINTS

### 1. Calculate Expression

- **Method:** POST
- **Path:** `/api/calculate`
- **Request Body:** `CalculationRequest`
  ```json
  {
    "expression": "2+2-1"
  }
  ```
- **Response 200:** `CalculationResponse`
  ```json
  {
    "result": 3,
    "expression": "2+2-1",
    "cached": false
  }
  ```
- **Response 400:** `ErrorResponse`
  ```json
  {
    "error": "InvalidExpression",
    "message": "The provided expression is invalid."
  }
  ```
- **Response 401:** `ErrorResponse`
  ```json
  {
    "error": "Unauthorized",
    "message": "JWT token is missing or invalid."
  }
  ```

### 2. Health Check

- **Method:** GET
- **Path:** `/api/health`
- **Response 200:**
  ```json
  {
    "status": "ok"
  }
  ```

---

## 4. FILE STRUCTURE

### PORT TABLE

| Service              | Listening Port | Path                        |
|----------------------|---------------|-----------------------------|
| auth-service         | 8001          | backend/auth-service/       |
| calculation-service  | 8002          | backend/calculation-service/|
| validation-service   | 8003          | backend/validation-service/ |

### SHARED MODULES

| Shared path         | Imported by services                                 |
|---------------------|-----------------------------------------------------|
| backend/shared/     | auth-service, calculation-service, validation-service |

### FILE TREE

```
/
├── docker-compose.yml                # Multi-service orchestration (Postgres, Redis, backend services, frontend)
├── .env.example                      # Template for all required environment variables
├── .gitignore                        # Ignore node_modules, build, .env, etc.
├── README.md                         # Project overview and setup instructions
├── run.sh                            # Root-level startup script for local development
├── backend/
│   ├── shared/                       # Shared modules (types, utils)
│   │   ├── types.ts                  # Shared TypeScript interfaces
│   │   └── jwt.ts                    # JWT verification logic
│   ├── auth-service/
│   │   ├── Dockerfile                # Auth service Dockerfile (EXPOSE 8001)
│   │   ├── src/
│   │   │   ├── index.ts              # Express app entry point
│   │   │   ├── auth.controller.ts    # JWT validation logic
│   │   │   └── user.model.ts         # User DB model
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env.example
│   ├── calculation-service/
│   │   ├── Dockerfile                # Calculation service Dockerfile (EXPOSE 8002)
│   │   ├── src/
│   │   │   ├── index.ts              # Express app entry point
│   │   │   ├── calculation.controller.ts # Calculation endpoint logic
│   │   │   ├── calculation.model.ts  # Calculation DB model
│   │   │   └── cache.ts              # Redis cache logic
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env.example
│   ├── validation-service/
│   │   ├── Dockerfile                # Validation service Dockerfile (EXPOSE 8003)
│   │   ├── src/
│   │   │   ├── index.ts              # Express app entry point
│   │   │   ├── validation.controller.ts # Expression validation logic
│   │   │   └── validation.utils.ts   # Expression parsing/validation helpers
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env.example
│   └── shared/
│       ├── types.ts                  # Shared interfaces
│       └── jwt.ts                    # JWT verification
├── frontend/
│   ├── Dockerfile                    # Frontend Dockerfile
│   ├── public/
│   │   └── index.html                # HTML entry point
│   ├── src/
│   │   ├── main.tsx                  # React entry point
│   │   ├── App.tsx                   # Root component
│   │   ├── components/
│   │   │   ├── Calculator.tsx        # Calculator UI component
│   │   │   ├── ResultDisplay.tsx     # Displays calculation result
│   │   │   └── ExpressionInput.tsx   # Input field for expressions
│   │   ├── hooks/
│   │   │   └── useCalculator.ts      # React hook for calculation state
│   │   ├── api/
│   │   │   └── calculate.ts          # API client for /api/calculate
│   │   ├── types/
│   │   │   └── index.ts              # Frontend TypeScript interfaces
│   │   └── styles/
│   │       └── main.css              # Minimalist responsive styles
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── infra/
│   ├── aws-ecs/
│   │   ├── task-definition.json      # ECS task definition
│   │   └── service-definition.json   # ECS service definition
│   └── github-actions/
│       └── ci-cd.yml                 # GitHub Actions workflow
```

---

## 5. ENVIRONMENT VARIABLES

| Name                        | Type   | Description                                              | Example Value                |
|-----------------------------|--------|----------------------------------------------------------|------------------------------|
| NODE_ENV                    | string | Node.js environment ("development", "production")        | production                   |
| PORT                        | number | Service listening port (must match PORT TABLE)           | 8002                         |
| POSTGRES_HOST               | string | PostgreSQL hostname                                      | db                           |
| POSTGRES_PORT               | number | PostgreSQL port                                          | 5432                         |
| POSTGRES_DB                 | string | PostgreSQL database name                                 | calcu                        |
| POSTGRES_USER               | string | PostgreSQL username                                      | calcu_user                   |
| POSTGRES_PASSWORD           | string | PostgreSQL password                                      | supersecret                  |
| REDIS_HOST                  | string | Redis hostname                                           | redis                        |
| REDIS_PORT                  | number | Redis port                                               | 6379                         |
| JWT_SECRET                  | string | Secret for JWT validation                                | myjwtsecret                  |
| FRONTEND_API_URL            | string | Base URL for backend API (used by frontend)              | http://localhost:8002/api    |
| REACT_APP_API_URL           | string | Frontend env var for API endpoint                        | http://localhost:8002/api    |

---

## 6. IMPORT CONTRACTS

### Backend

- `from backend/shared/types import CalculationRequest, CalculationResponse, ErrorResponse, CalculationRecord, JWTPayload`
- `from backend/shared/jwt import verifyJWT`
- `from backend/calculation-service/src/calculation.controller import handleCalculate`
- `from backend/calculation-service/src/cache import getCachedResult, setCachedResult`
- `from backend/validation-service/src/validation.controller import validateExpression`
- `from backend/auth-service/src/auth.controller import validateJWTToken`
- `from backend/calculation-service/src/calculation.model import CalculationModel`
- `from backend/auth-service/src/user.model import UserModel`

### Frontend

- `import { CalculationRequest, CalculationResponse, ErrorResponse } from '../types'`
- `import { useCalculator } from '../hooks/useCalculator'`
- `import { calculate } from '../api/calculate'`
- `import Calculator from '../components/Calculator'`
- `import ResultDisplay from '../components/ResultDisplay'`
- `import ExpressionInput from '../components/ExpressionInput'`

---

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### Shared State Primitives

#### React hook

```typescript
useCalculator() → {
  expression: string;
  setExpression: (expr: string) => void;
  result: number | null;
  cached: boolean;
  loading: boolean;
  error: string | null;
  calculate: () => Promise<void>;
}
```

### Reusable Components

#### Calculator

```typescript
Calculator props: {
  expression: string;
  setExpression: (expr: string) => void;
  onCalculate: () => void;
  loading: boolean;
  error: string | null;
}
```

#### ResultDisplay

```typescript
ResultDisplay props: {
  result: number | null;
  cached: boolean;
}
```

#### ExpressionInput

```typescript
ExpressionInput props: {
  value: string;
  onChange: (expr: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}
```

---

## 8. FILE EXTENSION CONVENTION

- **Frontend files:** `.tsx` (TypeScript React)
- **Backend files:** `.ts` (TypeScript)
- **Project language:** TypeScript (no JavaScript files)
- **Entry point:** `/src/main.tsx` (as referenced in `public/index.html` via `<script type="module" src="/src/main.tsx"></script>`)
- **No `.jsx` or `.js` files are used anywhere in the project.**
