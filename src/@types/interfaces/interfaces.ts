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
