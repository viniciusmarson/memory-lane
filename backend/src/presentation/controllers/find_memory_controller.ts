import { ErrorHandler } from '@presentation/errors/error_handler';
import { HttpRequest } from '@presentation/interfaces/request';
import { HttpResponse } from '@presentation/interfaces/response';
import { FindMemoryUseCase } from '@domain/use-cases/find_memory/find_memory_use_case';
import { FindMemoryRequestDTO } from '@domain/use-cases/find_memory/find_memory_request_dto';

export class FindMemoryController {
  constructor(private findMemoryUseCase: FindMemoryUseCase) {}

  handle = async (
    request: HttpRequest<{ id: string }>,
    response: HttpResponse,
  ) => {
    try {
      if (!request.params?.id) {
        return ErrorHandler.handle(response, new Error('ID is required'));
      }

      const memory = await this.findMemoryUseCase.execute({
        id: parseInt(request.params.id),
      } as FindMemoryRequestDTO);

      return response.status(200).json(memory);
    } catch (error) {
      return ErrorHandler.handle(response, error);
    }
  };
}
