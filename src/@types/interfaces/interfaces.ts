export interface InterfaceUserlogin {
  email: string;
  password: string;
}
export interface InterfaceUserBody extends InterfaceUserlogin {
  name: string;
}

export interface InterfaceUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  permission?: string;
  sectorId?: number;
}

export interface InterfaceUser extends InterfaceUserBody {
  id: number;
  permission: string;
  sector?: {
    name: string;
    id: number;
  } | null;
  tickets?: {
    id: number;
    sectorId: number;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    title: string;
    description: string;
    slug: string;
    urgency: string;
    userId: number;
  }[];
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
  token?: string;
  data?: {
    id: number;
    name: string;
    email: string;
    permission: string;
    sector?: { name: string; id: number } | string;
    tickets?: {
      id: number;
      sectorId: number;
      createdAt: Date;
      updatedAt: Date;
      status: string;
      title: string;
      description: string;
      slug: string;
      urgency: string;
      userId: number;
    }[];
  };
};

export type InterfaceAllUser = {
  id: number;
  name: string;
  email: string;
  permission: string;
  password: string;
  sectorId: number | null;
  createdAt: Date;
  updatedAt: Date;
  sector: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}[];

export type AllUserResponse = Omit<UserResponse, "data"> & {
  data?: InterfaceAllUser;
};
