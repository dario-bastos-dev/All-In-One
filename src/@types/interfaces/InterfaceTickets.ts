export interface InterfaceTicketBody {
  title: string;
  description: string;
  sectorId: number;
  urgency: string;
  userId: number;
}
export interface InterfaceTicket extends InterfaceTicketBody {
  id: number;
  slug: string;
}

export type InterfaceTicketUpdate = {
  title?: string;
  description?: string;
  sectorId?: number;
  urgency?: string;
};

export type InterfaceTicketsAll = {
  title: string;
  description: string;
  sectorId: number;
  urgency: string;
  userId: number;
  id: number;
  slug: string;
}[];
