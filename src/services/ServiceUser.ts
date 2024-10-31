import {
  InterfaceUser,
  InterfaceUserBody,
  InterfaceUserlogin,
} from "../@types/interfaces/interfaces";
import User from "../models/ModelUser";

export default abstract class ServiceUser {
  static async createUser(
    body: InterfaceUserBody
  ): Promise<{ user: InterfaceUser; error: string[] } | undefined> {
    try {
      const user = new User(body);
      await user.register();

      if (user.error != null) {
        if (user.user != null) {
          return { user: user.user, error: user.error };
        } else
          return {
            user: { id: 0, name: "", email: "", password: "" },
            error: user.error,
          };
      }
    } catch (error) {
      console.error("Ocorreu um erro: ", error);
    }
  }
}
