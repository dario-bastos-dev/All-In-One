import {
  InterfaceUser,
  InterfaceUserBody,
  InterfaceUserlogin,
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

      if (user.user == null) {
        if (user.error != null && user.error.length > 0) {
          response = {
            status: "error",
            error: user.error,
          };
          return response;
        }
      } else {
        response = {
          status: "success",
          data: {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
          },
        };
        return response;
      }
    } catch (error) {
      console.error("Ocorreu um erro: ", error);
    }
  }

  static async login(
    body: InterfaceUserlogin
  ): Promise<UserResponse | undefined> {
    try {
      const user = new User(body);
      await user.login();

      let response: UserResponse;

      if (user.user != null) {
        if (user.error == null || user.error.length <= 0) {
          response = {
            status: "success",
            message: "Autorized",
          };

          return response;
        } else {
          response = {
            status: "error",
            error: user.error,
          };
          return response;
        }
      } else {
        if (user.error != null && user.error.length > 0) {
          response = {
            status: "error",
            error: user.error,
          };

          return response;
        }
      }
    } catch (error) {}
  }
}
