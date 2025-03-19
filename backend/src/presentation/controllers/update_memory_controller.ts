import { HttpRequest } from '@presentation/interfaces/request';
import { HttpResponse } from '@presentation/interfaces/response';
import { ErrorHandler } from '@presentation/errors/error_handler';
import { UpdateMemoryUseCase } from '@domain/use-cases/update_memory/update_memory_use_case';

export class UpdateMemoryController {
  constructor(private readonly updateMemoryUseCase: UpdateMemoryUseCase) {}

  handle = async (
    request: HttpRequest<{
      title: string;
      description: string;
      timestamp: Date;
    }>,
    response: HttpResponse,
  ) => {
    try {
      if (!request.params?.id) {
        return ErrorHandler.handle(response, new Error('ID is required'));
      }

      if (!request.body) {
        return ErrorHandler.handle(response, new Error('Body is required'));
      }

      const { title, description, timestamp } = request.body;

      await this.updateMemoryUseCase.execute({
        id: parseInt(request.params.id),
        title,
        description,
        timestamp,
      });

      return response.status(200).json({ message: 'Memory updated' });
    } catch (error) {
      return ErrorHandler.handle(response, error);
    }
  };
}
