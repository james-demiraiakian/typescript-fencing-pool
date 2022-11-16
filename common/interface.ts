export interface userInterface {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  clubId: string;
  owner: boolean;
}

export interface signInInterface {
  email: string;
  password: string;
}
