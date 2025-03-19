import { Request, Response } from 'express';
import { mock, MockProxy } from 'jest-mock-extended';
import { ListMemoriesController } from '../list_memories_controller';
import { ListMemoriesUseCase } from '@domain/use-cases/list_memories/list_memories_use_case';
import { ListMemoriesResultResponseDTO } from '@application/use-cases/memories/list_memories/list_memories_response_dto';

describe('ListMemoriesController', () => {
  let listMemoriesController: ListMemoriesController;
  let listMemoriesUseCase: MockProxy<ListMemoriesUseCase>;
  let response: MockProxy<Response>;

  beforeEach(() => {
    listMemoriesUseCase = mock<ListMemoriesUseCase>();
    listMemoriesController = new ListMemoriesController(listMemoriesUseCase);
    response = mock<Response>();
    response.status.mockReturnThis();
    response.json.mockReturnThis();
  });

  it('should return 200 with jobs data on success', async () => {
    const request = {
      query: {
        sort: 'newest',
      },
    };

    const expectedMemories = [
      {
        id: 1,
        title: 'Memory 1',
        description: 'Description 1',
        filename: 'filename1.jpg',
        url: 'https://example.com/filename1.jpg',
        timestamp: new Date('2021-01-01'),
      },
    ] as ListMemoriesResultResponseDTO[];

    listMemoriesUseCase.execute.mockResolvedValue(expectedMemories);

    await listMemoriesController.handle(request as Request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(expectedMemories);
    expect(listMemoriesUseCase.execute).toHaveBeenCalledWith({
      sort: request.query.sort,
    });
  });

  it('should throw ValidationError if page is missing', async () => {
    const request = {
      query: {
        limit: 10,
      },
    };

    await listJobsController.handle(request as Request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: {
        message: 'Validation failed',
        details: 'Invalid request page and limit are required',
      },
    });
  });

  it('should throw ValidationError if limit is missing', async () => {
    const request = {
      query: {
        page: 1,
      },
    };

    await listJobsController.handle(request as Request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: {
        message: 'Validation failed',
        details: 'Invalid request page and limit are required',
      },
    });
  });

  it('should handle unexpected errors', async () => {
    const request = {
      query: {
        page: 1,
        limit: 10,
      },
    };

    const error = new Error('Unexpected error');
    listJobsUseCase.execute.mockRejectedValue(error);

    await listJobsController.handle(request as Request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      },
    });
  });
});
