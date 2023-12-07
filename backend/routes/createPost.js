import { Router } from "express";
import { Messages} from "../models/messages.js";
import { Users } from "../models/users.js";


const createPostRouter = Router();

createPostRouter.post("/", async (req, res) => {
    try {
        const { user, post } = req.body;

        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }

        const newPost = {
            title: post.title,
            body: post.body,
            createdBy: user._id,
        };

        const createdPost = await Messages.create(newPost);

        if (createdPost) {
            await Users.updateOne(
                { _id: user._id },
                { $push: { messasges: createdPost._id } }
            );
        }

        return res.status(201).send({ message: "Post created successfully" });
    } catch (error) {
        console.error('Error creating post:', error.message);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});
export default createPostRouter;