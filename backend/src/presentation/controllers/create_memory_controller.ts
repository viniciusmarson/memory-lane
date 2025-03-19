import { HttpRequest } from '@presentation/interfaces/request';
import { HttpResponse } from '@presentation/interfaces/response';
import { ErrorHandler } from '@presentation/errors/error_handler';
import { CreateMemoryUseCase } from '@domain/use-cases/create_memory/create_memory_use_case';
import { CreateMemoryRequestDTO } from '@domain/use-cases/create_memory/create_memory_request_dto';

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
        url: `http://localhost:4001/uploads/${request.file.filename}`,
        timestamp,
      });

      return response.status(201).json({ message: 'Memory created' });
    } catch (error) {
      return ErrorHandler.handle(response, error);
    }
  };
}
