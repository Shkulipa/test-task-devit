export interface IErrorResponse extends Error {
  status: number;
  data: { message: string };
}