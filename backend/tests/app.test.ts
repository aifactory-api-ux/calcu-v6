import request from 'supertest';
import express, { Express } from 'express';
import { healthCheck } from '../src/health.controller.js';

const createApp = (): Express => {
  const app: Express = express();
  app.use(express.json());
  app.get('/api/health', healthCheck);
  return app;
};

describe('App', () => {
  let app: Express;

  beforeAll(() => {
    app = createApp();
  });

  it('health endpoint returns 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
  });

  it('health endpoint returns correct body', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('backend');
    expect(res.body.version).toBe('1.0.0');
  });

  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.status).toBe(404);
  });
});