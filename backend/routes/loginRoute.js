import passportConfig from "../passportConfig.js";
import passport from "passport"
import { Router } from "express";

const loginRouter = Router();
passportConfig(passport);

loginRouter.post("/", (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
          if (err) throw err;
          if (!user) res.send(info.message);
          else {
            req.logIn(user, (err) => {
              if (err) throw err;
              res.send("Successfully Authenticated");
            });
          }
        })(req, res, next);

})

export default loginRouter;