import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,

      trim: true,
      minlength: 3,
    },
    firstname: {
      type: String,

      trim: true,
      minlength: 3,
    },
    lastname: {
      type: String,

      trim: true,
      minlength: 3,
    },
    password: {
      type: String,

      trim: true,
      minlength: 3,
    },
    memberStatus: {
      type: String,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Users = mongoose.model("Users", UserSchema);
