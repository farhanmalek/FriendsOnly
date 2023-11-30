//Create server and establish connection to mongoDB
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import registerRoute from "./routes/registerRoute.js";
import loginRouter from "./routes/loginRoute.js";

dotenv.config();
//generic middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Passport Auth middleware
app.use(
  session({ secret: "farhansapp", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

//Access to current user stored in session in all views
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });

//Test Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//Register Route
app.use("/register", registerRoute);
// Login Route
app.use("/login", loginRouter);

//Create Port and Connect to MONGO
//PORT
const PORT = process.env.PORT || 5000;
//Create the server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Serving base @ http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error, "Failed DB connection");
  }); //Connect to MongoDB
