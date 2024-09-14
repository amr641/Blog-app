export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  bio: string;
  changedPassword: boolean;
  status: boolean;
  __v: number;
}
