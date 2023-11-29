//Create server and establish connection to mongoDB
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from 'passport';
import passportLocal from 'passport-local';
import { Users } from './models/users.js';
import session from "express-session";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//Passport Auth middleware
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = passportLocal.Strategy;
 passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await Users.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        };
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        };
        return done(null, user);
      } catch(err) {
        return done(err);
      };
    })
  );

 passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Users.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
  });

//Test Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//Routes
//Register Route
app.use("/register", registerRoute)
//Login Route
app.use("/login", loginRoute)





//Create Port and Connect to MONGO
//PORT
const PORT = process.env.PORT || 5000;
//Create the server
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
        console.log(`Serving base @ http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.log(error, "Failed DB connection");
}); //Connect to MongoDB


