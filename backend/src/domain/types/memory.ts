export type Memory = {
  id: number;
  title: string;
  description: string;
  filename: string;
  url: string;
  timestamp: Date;
};

export type PaginatedMemories = {
  memories: Memory[];
  total: number;
};
