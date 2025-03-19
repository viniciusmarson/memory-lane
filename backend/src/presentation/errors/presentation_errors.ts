import { BaseError } from '@domain/errors/base_error';

export class ValidationError extends BaseError {
  constructor(details: string) {
    super('Validation failed', 400, 'PRESENTATION.VALIDATION_ERROR', details);
  }
}
