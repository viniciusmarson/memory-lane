import { Response } from 'express';
import { BaseError } from '@domain/errors/base_error';
import { ErrorHandler } from '@presentation/errors/error_handler';

class MockError extends BaseError {
  constructor(message: string, statusCode: number, details: string) {
    super(message, statusCode, 'MOCK_ERROR', details);
  }
}

describe('ErrorHandler', () => {
  let mockResponse: Partial<Response>;
  let jsonSpy: jest.Mock;
  let statusSpy: jest.Mock;

  beforeEach(() => {
    jsonSpy = jest.fn().mockReturnThis();
    statusSpy = jest.fn().mockReturnThis();
    mockResponse = {
      status: statusSpy,
      json: jsonSpy,
    };
  });

  it('should handle BaseError with correct status code and message', () => {
    const customError = new MockError('Custom error message', 400, 'value');

    ErrorHandler.handle(mockResponse as Response, customError);

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalledWith({
      error: {
        message: 'Custom error message',
        details: 'value',
      },
    });
  });

  it('should handle unexpected errors with 500 status code', () => {
    const unexpectedError = new Error('Unexpected error');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    ErrorHandler.handle(mockResponse as Response, unexpectedError);

    expect(statusSpy).toHaveBeenCalledWith(500);
    expect(jsonSpy).toHaveBeenCalledWith({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      },
    });
    expect(consoleSpy).toHaveBeenCalledWith(unexpectedError);

    consoleSpy.mockRestore();
  });
});
