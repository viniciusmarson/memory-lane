import { HttpRequest, HttpResponse } from 'express';
import { ErrorHandler } from '@presentation/errors/error_handler';
import { ListMemoriesUseCase } from '@domain/use-cases/list_memories/list_memories_use_case';
import { ListMemoriesRequestDTO } from '@domain/use-cases/list_memories/list_memories_request_dto';

export class ListMemoriesController {
  constructor(private listMemoriesUseCase: ListMemoriesUseCase) {}

  handle = async (
    request: HttpRequest<{ sort: string; page: number; limit: number }>,
    response: HttpResponse,
  ) => {
    try {
      const sort = request.query?.sort || 'oldest';
      const page = request.query?.page || 1;
      const limit = request.query?.limit || 10;

      const memories = await this.listMemoriesUseCase.execute({
        sort,
        page,
        limit,
      } as ListMemoriesRequestDTO);

      return response.status(200).json(memories);
    } catch (error) {
      return ErrorHandler.handle(response, error);
    }
  };
}
