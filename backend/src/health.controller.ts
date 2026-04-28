import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'backend',
    version: '1.0.0',
  });
};