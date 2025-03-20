import { HttpRequest, HttpResponse } from 'express';
import { ErrorHandler } from '@presentation/errors/error_handler';
import { DeleteMemoryUseCase } from '@domain/use-cases/delete_memory/delete_memory_use_case';
import { DeleteMemoryRequestDTO } from '@domain/use-cases/delete_memory/delete_memory_request_dto';

export class DeleteMemoryController {
  constructor(private deleteMemoryUseCase: DeleteMemoryUseCase) {}

  handle = async (
    request: HttpRequest<{ id: string }>,
    response: HttpResponse,
  ) => {
    try {
      if (!request.params?.id) {
        return ErrorHandler.handle(response, new Error('ID is required'));
      }

      await this.deleteMemoryUseCase.execute({
        id: parseInt(request.params.id),
      } as DeleteMemoryRequestDTO);

      return response.status(200).json({ message: 'Memory deleted' });
    } catch (error) {
      return ErrorHandler.handle(response, error);
    }
  };
}
