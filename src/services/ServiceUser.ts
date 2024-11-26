import {
  AllUserResponse,
  InterfaceUserBody,
  InterfaceUserlogin,
  InterfaceUserUpdate,
  UserResponse,
} from "../@types/interfaces/interfaces";
import User from "../models/ModelUser";
// Lógica da rota de usuários
export default abstract class ServiceUser {
  // -Lógica para registrar o usuário
  static async createUser(
    body: InterfaceUserBody
  ): Promise<UserResponse | undefined> {
    try {
      const user = new User(body);
      await user.register();

      let response: UserResponse;

      if (user.error != null && user.error.length > 0) {
        response = {
          status: "error",
          error: user.error,
        };
        return response;
      } else if (user.user != null) {
        if (user.user.sector != null)
          response = {
            status: "success",
            data: {
              id: user.user.id,
              name: user.user.name,
              email: user.user.email,
              sector: user.user.sector,
              permission: user.user.permission,
            },
          };
        else
          response = {
            status: "success",
            data: {
              id: user.user.id,
              name: user.user.name,
              email: user.user.email,
              sector: "A definir",
              permission: user.user.permission,
            },
          };

        return response;
      }
    } catch (error) {
      console.error("Ocorreu um erro: ", error);
    }
  }
  // -Lógica para buscar um usuário
  static async getUser(id: string) {
    try {
      const userId = parseInt(id);
      const user = new User(undefined);
      await user.getUser(userId);

      let response: UserResponse;

      console.log(user.user);

      if (user.error != null && user.error.length > 0) {
        response = {
          status: "error",
          error: user.error,
        };

        return response;
      } else if (user.user != null) {
        if (user.user.sector != null)
          response = {
            status: "success",
            data: {
              id: user.user.id,
              name: user.user.name,
              email: user.user.email,
              sector: user.user.sector,
              permission: user.user.permission,
            },
          };
        else
          response = {
            status: "success",
            data: {
              id: user.user.id,
              name: user.user.name,
              email: user.user.email,
              sector: "A definir",
              permission: user.user.permission,
            },
          };

        return response;
      }
    } catch (error) {}
  }

  // -Lógica para buscar todos os usuários
  static async getAllUser() {
    try {
      const user = new User(undefined);
      const allUsers = await user.getAllUser();

      let response: AllUserResponse;

      console.log(user.user);

      if (user.error != null && user.error.length > 0) {
        response = {
          status: "error",
          error: user.error,
        };

        return response;
      } else if (allUsers != null) {
          response = {
            status: "success",
            data: allUsers,
          };

        return response;
      }
    } catch (error) {}
  }

  // -Lógica para login do usuário
  static async login(
    body: InterfaceUserlogin
  ): Promise<UserResponse | undefined> {
    try {
      const user = new User(body);
      await user.login();

      let response: UserResponse;

      if (user.error != null && user.error.length > 0) {
        response = {
          status: "error",
          error: user.error,
        };

        return response;
      } else if (user.user != null) {
        response = {
          status: "success",
          message: "autorized",
          data: {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
            permission: user.user.permission,
          },
        };

        return response;
      }
    } catch (error) {}
  }

  // -Lógica para atualizar um usuário
  public static async updateUser(
    id: string,
    body: InterfaceUserUpdate
  ) {
    try {
      const userId = parseInt(id);

      const user = new User(undefined);
      await user.updateUser(userId, body);

      let response;

      if (user.error != null && user.error.length > 0) {
        response = {
          status: "error",
          message: user.error,
        };
        return response;
      } else if (user.user != null) {
        response = {
          status: "success",
          message: "usuário atualizado com sucesso!",
        };
        return response;
      }
    } catch (error) {
      console.error("Ocorreu um erro: ", error);
    }
  }

}
