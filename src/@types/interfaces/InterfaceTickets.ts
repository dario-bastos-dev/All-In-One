export interface InterfaceBody {
  title: string;
  description: string;
  urgency: string;
  status: string;
}
export interface InterfaceTicketBody extends InterfaceBody {
  sectorId: number;
  userId: number;
}

export interface InterfaceTicketNewBody extends InterfaceBody {
  userId: string;
  sectorId: string;
}
export interface InterfaceTicket extends InterfaceTicketBody {
  id: number;
  slug: string;
}

export interface InterfaceTicketUpdate {
  title?: string;
  description?: string;
  sectorId?: number;
  urgency?: string;
  status?: string;
}

export interface ResponseTicket {
  status: string;
  message?: string;
  error?: string[];
  data?:
    | {
        id: number;
        title: string;
        description: string;
        status: string;
        sector: number | string;
        urgency: string;
        user: number | string;
        slug: string;
        created?: Date;
      }
    | InterfaceTicketsAll
    | InterfaceTicketInformations[];
}

export type InterfaceTicketsAll = {
  title: string;
  description: string;
  status: string;
  sectorId: number;
  urgency: string;
  userId: number;
  id: number;
  slug: string;
}[];

export type InterfaceTicketInformations =
  | ({
      sector: {
        name: string;
        id: number;
      };
      user: {
        name: string;
        id: number;
        email: string;
      };
    } & {
      title: string;
      description: string;
      status: string;
      sectorId: number;
      urgency: string;
      userId: number;
      id: number;
      slug: string;
      createdAt: Date;
    })
  | null;
