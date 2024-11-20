export interface IUser {
  _id?: number;
  name: string;
  email: string;
  password: string;

  token?: string;
  termsAccepted?: boolean;
}
