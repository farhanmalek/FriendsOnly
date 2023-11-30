import passportConfig from "../passportConfig.js";
import passport from "passport";
import { Router } from "express";

const loginRouter = Router();

// Initialize passport outside of the route handler
passportConfig(passport);
loginRouter.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Authentication failed
      return res.status(401).json({ message: info.message });
    }
    // Authentication successful
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Send a success response
      return res.json({ message: 'Login successful' });
    });
  })(req, res, next);
});


export default loginRouter;
