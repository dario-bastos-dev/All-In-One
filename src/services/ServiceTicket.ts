import { log } from "console";
import {
  InterfaceTicketBody,
  InterfaceTicketNewBody,
  InterfaceTicketUpdate,
  ResponseTicket,
} from "../@types/interfaces/InterfaceTickets";
import Ticket from '../models/ModelTicket';

// Lógica da rota de chamados
export default abstract class ServiceTicket {
  // -Lógica para registrar o usuário
  public static async createTicket(
    body: InterfaceTicketNewBody
  ): Promise<ResponseTicket | undefined> {
    try {
      const newBody = {
        title: body.title,
        description: body.description,
        urgency: body.urgency,
        status: body.status,
        sectorId: parseInt(body.sectorId),
        userId: parseInt(body.userId),
      };

      const ticket = new Ticket(newBody);
      await ticket.register();

      let response: ResponseTicket;

      if (ticket.error != null && ticket.error.length > 0) {
        response = {
          status: "error",
          error: ticket.error,
        };

        return response;
      } else if (ticket.ticket != null) {
        response = {
          status: "success",
          data: {
            id: ticket.ticket.id,
            title: ticket.ticket.title,
            description: ticket.ticket.description,
            status: ticket.ticket.status,
            sector: ticket.ticket.sectorId,
            urgency: ticket.ticket.urgency,
            user: ticket.ticket.userId,
            slug: ticket.ticket.slug,
          },
        };

        return response;
      }
    } catch (error) {
      console.error("Ocorreu um erro: ", error);
    }
  }
  // -Lógica para buscar todos os tickets
  public static async getAllTickets(): Promise<ResponseTicket | undefined> {
    try {
      const ticket = new Ticket(undefined);
      const result = await ticket.getAllTickets();

      let response: ResponseTicket;

      if (ticket.error != null && ticket.error.length > 0) {
        response = {
          status: "error",
          error: ticket.error,
        };
        return response;
      } else if (result != undefined) {
        response = {
          status: "success",
          data: result,
        };
        return response;
      }
    } catch (error) {
      console.error("Ocorreu um erro: ", error);
    }
  }
  // -Lógica para buscar um ticket
  public static async getTicket(
    slug: string
  ): Promise<ResponseTicket | undefined> {
    try {
      const getTicket = new Ticket(undefined);
      const ticket = await getTicket.getTicket(slug);

      let response: ResponseTicket;

      console.log(ticket);

      if (getTicket.error != null && getTicket.error.length > 0) {
        response = {
          status: "error",
          error: getTicket.error,
        };
        return response;
      } else if (ticket != null) {

        console.log(ticket.sector);
        
        response = {
          status: "success",
          data: {
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            sector: ticket.sector.name,
            urgency: ticket.urgency,
            user: ticket.user.name,
            slug: ticket.slug,
            created: ticket.createdAt
          },
        };
        return response;
      }
    } catch (error) {
      console.error("Ocorreu um erro: ", error);
    }
  }
  // -Lógica para atualizar um ticket
  public static async updateTicket(
    id: string,
    body: InterfaceTicketUpdate
  ): Promise<ResponseTicket | undefined> {
    try {
      const ticketId = parseInt(id);

      const ticket = new Ticket(undefined);
      await ticket.updateTicket(ticketId, body);

      let response: ResponseTicket;

      if (ticket.error != null && ticket.error.length > 0) {
        response = {
          status: "error",
          error: ticket.error,
        };
        return response;
      } else if (ticket.ticket != null) {
        response = {
          status: "success",
          message: "Ticket atualizado com sucesso!",
        };
        return response;
      }
    } catch (error) {
      console.error("Ocorreu um erro: ", error);
    }
  }
  // -Lógica para deletar um ticket
  public static async deleteTicket(
    id: string
  ): Promise<ResponseTicket | undefined> {
    try {
      const ticketId = parseInt(id);
      const ticket = new Ticket(undefined);
      await ticket.delete(ticketId);

      let response: ResponseTicket;

      if (ticket.error != null && ticket.error.length > 0) {
        response = {
          status: "error",
          error: ticket.error,
        };
        return response;
      } else if (ticket.ticket != null) {
        response = {
          status: "success",
          message: "Ticket deletado com sucesso!",
        };
        return response;
      }
    } catch (error) {
      console.error("Ocorreu um erro: ", error);
    }
  }
}
