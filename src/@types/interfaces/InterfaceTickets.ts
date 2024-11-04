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
        sectorId: number;
        urgency: string;
        userId: number;
        slug: string;
      }
    | InterfaceTicketsAll;
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
