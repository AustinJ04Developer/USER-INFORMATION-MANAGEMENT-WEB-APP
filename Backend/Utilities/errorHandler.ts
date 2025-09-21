import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

export function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  if (err instanceof AppError) {
    res.status(err.status).json({
      error: err.message,
      details: err.details || undefined,
    });
  } else {
    res.status(500).json({
      error: err.message || 'Internal Server Error',
      details: err.details || undefined,
    });
  }
}
