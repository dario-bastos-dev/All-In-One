import session from "express-session";
import crypto from "crypto";

const sessionUsage = session({
          secret: crypto.randomBytes(64).toString('hex'),
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 7 * 1000,
          },
          name: "user"
})

export default sessionUsage;