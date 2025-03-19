import { listMemoriesFactory } from '@presentation/factories/list_memories_factory';
import { ListMemoriesController } from '@presentation/controllers/memories/list_memories/list_memories_controller';
import { SQLiteMemoryRepository } from '@data/repositories/sqlite_memory_repository';
import { ListMemoriesUseCase } from '@domain/use-cases/list_memories/list_memories_use_case';

jest.mock(
  '@presentation/controllers/memories/list_memories/list_memories_controller',
);
jest.mock('@data/repositories/sqlite_memory_repository');
jest.mock(
  '@application/use-cases/memories/list_memories/list_memories_use_case',
);

describe('listMemoriesFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create ListJobsController with proper dependencies', () => {
    // Act
    const controller = listMemoriesFactory();

    // Assert
    expect(SQLiteMemoryRepository).toHaveBeenCalledTimes(1);
    expect(ListMemoriesUseCase).toHaveBeenCalledTimes(1);
    expect(ListMemoriesController).toHaveBeenCalledTimes(1);

    // Get the instances that were created by the mocked constructors
    const memoryRepository = (SQLiteMemoryRepository as jest.Mock).mock
      .instances[0];
    const listMemoriesUseCase = (ListMemoriesUseCase as jest.Mock).mock
      .instances[0];

    // Verify dependencies are properly passed
    expect(ListMemoriesUseCase).toHaveBeenCalledWith(memoryRepository);
    expect(ListMemoriesController).toHaveBeenCalledWith(listMemoriesUseCase);

    expect(controller).toBeInstanceOf(ListMemoriesController);
  });
});
