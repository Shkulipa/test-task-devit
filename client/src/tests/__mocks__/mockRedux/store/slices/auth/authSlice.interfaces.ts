import { IUser } from '../../../../../../interfaces/user';
export interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  error: string;
}