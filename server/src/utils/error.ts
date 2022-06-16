export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static forbidden(message: string) {
    return new ApiError(403, message);
  }

  static unauthorized(message: string) {
    return new ApiError(401, message);
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }

  static internal(message: string) {
    return new ApiError(500, message);
  }
}
