import mongoose from "mongoose";
import { ROLES } from "../../constants/roles";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER
    }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
