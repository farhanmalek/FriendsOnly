import passport from 'passport';
import { Router } from 'express';

const loginRoute = Router();

//Route to login a registered user.
loginRoute.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login"
    })
  );
export default loginRoute
