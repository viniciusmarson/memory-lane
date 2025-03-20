import { Request, Response } from 'express';
import { mock, MockProxy } from 'jest-mock-extended';
import { ListMemoriesController } from '../list_memories_controller';
import { ListMemoriesUseCase } from '@domain/use-cases/list_memories/list_memories_use_case';

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

  it('should return 200 with memories data on success with default values', async () => {
    const request = {};

    const expectedMemories = {
      memories: [
        {
          id: 1,
          title: 'Memory 1',
          description: 'Description 1',
          filename: 'filename1.jpg',
          url: 'https://example.com/filename1.jpg',
          timestamp: new Date('2021-01-01'),
        },
      ],
      total: 1,
    };

    listMemoriesUseCase.execute.mockResolvedValue(expectedMemories);

    await listMemoriesController.handle(request as Request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(expectedMemories);
    expect(listMemoriesUseCase.execute).toHaveBeenCalledWith({
      sort: 'oldest', // default sort
      limit: 10, // default limit
      page: 1, // default page
    });
  });

  it('should return 200 with memories data on success with sort, page and limit', async () => {
    const request = {
      query: {
        sort: 'oldest',
        page: 2,
        limit: 15,
      },
    };

    const expectedMemories = {
      memories: [
        {
          id: 1,
          title: 'Memory 1',
          description: 'Description 1',
          filename: 'filename1.jpg',
          url: 'https://example.com/filename1.jpg',
          timestamp: new Date('2021-01-01'),
        },
      ],
      total: 1,
    };

    listMemoriesUseCase.execute.mockResolvedValue(expectedMemories);

    await listMemoriesController.handle(request as Request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(expectedMemories);
    expect(listMemoriesUseCase.execute).toHaveBeenCalledWith({
      sort: request.query.sort,
      limit: request.query.limit,
      page: request.query.page,
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
    listMemoriesUseCase.execute.mockRejectedValue(error);

    await listMemoriesController.handle(request as Request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      },
    });
  });
});
