import "express-session"
import { InterfaceSession } from "../interfaces/interfaces"

declare module "express-session" {
          interface SessionData{
                    user?: InterfaceSession;
          }
}