
export class ResourceNotFoundError extends Error {
  public readonly statusCode = 404;
  public readonly code = 'RESOURCE_NOT_FOUND';

  constructor(public readonly resourceId: string) {
    super(`Document with id '${resourceId}' not found`);
    this.name = 'ResourceNotFoundError';
  }
}
