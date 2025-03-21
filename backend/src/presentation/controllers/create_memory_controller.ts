import { HttpRequest, HttpResponse } from 'express';
import { ErrorHandler } from '@presentation/errors/error_handler';
import { CreateMemoryUseCase } from '@domain/use-cases/create_memory/create_memory_use_case';

export class CreateMemoryController {
  constructor(private readonly createMemoryUseCase: CreateMemoryUseCase) {}

  handle = async (
    request: HttpRequest<{
      title: string;
      description: string;
      timestamp: Date;
    }>,
    response: HttpResponse,
  ) => {
    try {
      if (!request.body) {
        return ErrorHandler.handle(response, new Error('Body is required'));
      }

      if (!request.file) {
        return ErrorHandler.handle(response, new Error('File is required'));
      }

      const { title, description, timestamp } = request.body;

      await this.createMemoryUseCase.execute({
        title,
        description,
        filename: request.file.filename,
        url: `${process.env.SERVER_DOMAIN}/uploads/${request.file.filename}`,
        timestamp,
      });

      return response.status(201).json({ message: 'Memory created' });
    } catch (error) {
      return ErrorHandler.handle(response, error);
    }
  };
}
