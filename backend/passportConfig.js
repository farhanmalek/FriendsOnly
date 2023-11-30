import { Users } from "./models/users.js";
import bcrypt from "bcryptjs";
import { Strategy } from "passport-local";

export default function (passport) {
  passport.use(
    new Strategy(async (username, password, done) => {
      try {
        const user = await Users.findOne({ email: username });
        if (!user) {
          return done(null, false, {
            message: "That username does not exist!",
          });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  //Serialise user will create our cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //Deserialise user will unravel that cookie and allow us to use the
  //user info from req.user where ever in app
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Users.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
