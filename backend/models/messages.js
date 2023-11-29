import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
     
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

export const Messages = mongoose.model("Messages", MessageSchema);
