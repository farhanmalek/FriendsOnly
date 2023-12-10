import { Router } from "express";
import passport from "passport";
import passportConfig from "../passportConfig.js";

const logoutRouter = Router();

passportConfig(passport);
logoutRouter.get("/", (req, res) => {
  req.logout();
    res.clearCookie("cookie")
    req.session.destroy(function (err) {
        res.send("logged out!"); 
      });
});

export default logoutRouter;