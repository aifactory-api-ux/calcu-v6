# Coverage Report — frontend
Fecha: 2026-04-28  |  Stack: TypeScript/React/Vite  |  Directorio: frontend

## Resumen
| Métrica | Valor |
|---------|-------|
| Estado | 🟡 PARCIAL |
| Cobertura total | N/A (tests no funcionan correctamente) |
| Tests ejecutados | 19 |
| Tests pasados | 10 |
| Tests fallidos | 9 |

## Cobertura por archivo
N/A - Los tests no ejecutan correctamente debido a issues de importación.

## Tests fallidos / errores
- `useCalculator.test.ts` — parseExpression no es una función (parseExpression está definida dentro del hook, no es exportada)
- `ResultDisplay.test.tsx` — el test "renders nothing when result is null" falla porque el componente renderiza un div con clase aunque no tenga contenido

## Output completo
```
 RUN  v4.1.5 /workspace/cbd8a08b-d903-418b-a728-2c3ae1b7016b/frontend
      Coverage enabled with v8

 ❯ tests/useCalculator.test.ts (10 tests | 8 failed) 21ms
     × should return 0 for empty expression 10ms
     × should return 0 for whitespace only 1ms
     × should handle simple addition 0ms
     × should handle simple subtraction 0ms
     × should handle multiplication 1ms
     × should handle division 0ms
     × should handle multiple operations 1ms
     × should handle decimals 0ms
 ❯ tests/ResultDisplay.test.tsx (4 tests | 1 failed) 107ms
     × renders nothing when result is null 56ms

 FAIL  tests/ResultDisplay.test.tsx > ResultDisplay > renders nothing when result is null
AssertionError: expected <div class="result-display"></div> to be null

 FAIL  tests/useCalculator.test.ts > useCalculator - parseExpression > should return 0 for empty expression
TypeError: parseExpression is not a function

 Test Files  2 failed | 1 passed (3)
      Tests  9 failed | 10 passed (19)
   Start at  02:32:16
   Duration  22.00s
```