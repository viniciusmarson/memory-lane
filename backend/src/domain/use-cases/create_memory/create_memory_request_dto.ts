export interface CreateMemoryRequestDTO {
  readonly title: string;
  readonly description: string;
  readonly filename: string;
  readonly url: string;
  readonly timestamp: Date;
}