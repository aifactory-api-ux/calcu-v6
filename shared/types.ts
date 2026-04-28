export interface CalculationRequest {
  expression: string;
}

export interface CalculationResponse {
  result: number;
  expression: string;
  cached: boolean;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface JWTPayload {
  userId: string;
  exp: number;
}

export interface CalculationRecord {
  id: string;
  userId: string;
  expression: string;
  result: number;
  createdAt: string;
}