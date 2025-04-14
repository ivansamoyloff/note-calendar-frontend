import IUser from './IUser';

export default interface IUserState {
  user: IUser | null;
  isAuthenticated: boolean;
  setUser: (user: IUser) => void;
  logout: () => void;
}