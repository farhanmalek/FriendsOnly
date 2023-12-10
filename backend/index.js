//Create server and establish connection to mongoDB
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import registerRoute from "./routes/registerRoute.js";
import loginRouter from "./routes/loginRoute.js";
import logoutRouter from "./routes/logoutRoute.js";
import proRouter from "./routes/proRoute.js";
import getPostsRouter from "./routes/getPosts.js";
import createPostRouter from "./routes/createPost.js";
import cookieParser from "cookie-parser";


dotenv.config();
//generic middleware
const app = express();
app.enable("trust proxy",1);
app.use(express.json());
app.use(cors( {
  origin: "https://frontend-api-friends-only.vercel.app", 
  credentials: true,
}));


//Passport Auth middleware
app.use(
  session({ secret: "farhansapp", resave: false, saveUninitialized: false, cookie: { sameSite:"none",secure:true, domain: "api-friends-only.vercel.app", path:"/" }, name: "cookie" })
);
app.use(cookieParser("farhansapp"));
app.use(passport.initialize());
app.use(passport.session());


//Test Route
app.get("/", (req, res) => {
res.send("Welcome to the Members Only API");
});

app.get("/user", (req, res) => {
  res.send(req.user);
});
//Register Route
app.use("/register", registerRoute);
// Login Route
app.use("/login", loginRouter);
//Logout Route
app.use("/logout", logoutRouter);
//Upgrade to Pro Member
app.use("/pro", proRouter);
//Get all Posts
app.use("/posts", getPostsRouter);
//Create a Post
app.use("/createPost", createPostRouter);

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
