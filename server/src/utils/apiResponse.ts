export class ApiResponse<T> {
  public success: boolean;
  public data: T | null;
  public message: string;

  constructor(statusCode: number, data: T | null, message: string = 'Success') {
    this.success = statusCode < 400;
    this.data = data;
    this.message = message;
  }
}
