export interface InterfaceSectorBody {
  name: string;
}
export interface InterfaceSector extends InterfaceSectorBody {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
export type InterfaceSectorAll = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}[];

export type InterfaceSectorTickets =
  | ({
      ticket: {
        id: number;
        title: string;
        description: string;
        slug: string;
        sectorId: number;
        urgency: string;
        userId: number;
      }[];
    } & {
      id: number;
      name: string;
    })
  | null;

export type SectorResponse = {
  status: string;
  error?: string[];
  data?: {
    id: number;
    name: string;
    tickets?: {
      id: number;
      title: string;
      description: string;
      slug: string;
      sectorId: number;
      urgency: string;
      userId: number;
    }[];
  } | InterfaceSectorAll
};
