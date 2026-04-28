import request from 'supertest';
import express, { Express } from 'express';
import { healthCheck } from '../src/health.controller';

const app: Express = express();
app.use(express.json());
app.get('/api/health', healthCheck);

describe('GET /api/health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      service: 'backend',
      version: '1.0.0',
    });
  });

  it('returns JSON content type', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });
});