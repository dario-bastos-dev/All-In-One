export interface InterfaceUserlogin {
  email: string;
  password: string;
}
export interface InterfaceUserBody extends InterfaceUserlogin {
  name: string;
}

export interface InterfaceUser extends InterfaceUserBody {
  id: number;
}

export interface InterfaceSession {
  id: number;
  name: string;
  email: string;
}

export type InterfaceUserAll =
  | InterfaceUserlogin
  | InterfaceUserBody
  | InterfaceUser;

export type UserResponse = {
  status: string;
  message?: string;
  error?: string[];
  data?: {
    id: number;
    name: string;
    email: string;
  };
};
