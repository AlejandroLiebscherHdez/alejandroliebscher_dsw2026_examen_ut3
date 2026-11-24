export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code: string,
    public resourceId : string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}