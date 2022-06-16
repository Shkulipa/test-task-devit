export interface IAuthResponse {
  accessToken: string;
  _id: string;
  name: string;
  email: string;
}

export interface IUser extends Omit<IAuthResponse, "accessToken"> {
  _id: string;
  name: string;
  email: string;
}