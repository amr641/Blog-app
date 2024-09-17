export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  passwordChangedTime:Date
  avatar: string;
  bio: string;
  changedPassword: boolean;
  status: boolean;
  __v: number;
}
