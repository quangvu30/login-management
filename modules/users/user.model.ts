import { Schema, model, models } from "mongoose";
import { Role } from "@/constant/enum";

export interface IUser {
  email: string;
  password: string;
  name: string;
  birthday: Date;
  role: Role;
  token: Schema.Types.ObjectId;
  active: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    birthday: Date,
    role: { type: String, enum: Role, default: Role.User },
    active: { type: Boolean, default: false },
    token: { type: Schema.Types.ObjectId, ref: "Token", required: false },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const UserModel = models.User || model<IUser>("User", UserSchema);

export default UserModel;
