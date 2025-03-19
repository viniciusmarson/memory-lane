import { ErrorHandler } from '@presentation/errors/error_handler';
import { HttpRequest } from '@presentation/interfaces/request';
import { HttpResponse } from '@presentation/interfaces/response';
import { ListMemoriesUseCase } from '@domain/use-cases/list_memories/list_memories_use_case';
import { ListMemoriesRequestDTO } from '@domain/use-cases/list_memories/list_memories_request_dto';

export class ListMemoriesController {
  constructor(private listMemoriesUseCase: ListMemoriesUseCase) {}

  handle = async (
    request: HttpRequest<{ sort: string }>,
    response: HttpResponse,
  ) => {
    try {
      const sort = request.query?.sort || 'oldest';
      const memories = await this.listMemoriesUseCase.execute({
        sort,
      } as ListMemoriesRequestDTO);
      return response.status(200).json(memories);
    } catch (error) {
      return ErrorHandler.handle(response, error);
    }
  };
}
