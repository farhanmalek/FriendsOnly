import Router from "express";
import { Messages } from "../models/messages.js";

const getPostsRouter = Router();

getPostsRouter.get("/", async (req, res) => {
    try {
        const postWithUser = await Messages.aggregate([
            {
              $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "user"
              }
            },
            {
              $project: {
                title: 1,
                body: 1,
                createdAt: 1,
                user: { $arrayElemAt: ["$user", 0] },
        
              }
            }
          ]).sort({ createdAt: -1 });
        res.status(200).send(postWithUser);
        
    } catch (error) {
        console.log(error, "failed fetching all posts")
        res.status(500).send({ message: "failed fetching all posts" })
    }

})

export default getPostsRouter;