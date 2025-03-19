import { Response } from 'express';
import { BaseError } from '@domain/errors/base_error';

export class ErrorHandler {
  static handle(response: Response, error: Error): Response {
    if ('isBaseError' in error) {
      const baseError = error as BaseError;
      return response.status(baseError.statusCode).json({
        error: {
          message: baseError.message,
          details: baseError.details,
        },
      });
    }

    // TODO: Future handle unexpected errors
    console.error(error);

    return response.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      },
    });
  }
}
