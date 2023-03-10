import { Schema, model, models } from "mongoose";

export interface ILoginHistory {
  ipAddress: string;
  user: Schema.Types.ObjectId;
}

const LoginHistorySchema = new Schema<ILoginHistory>(
  {
    ipAddress: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const LoginHistoryModel =
  models.LoginHistory ||
  model<ILoginHistory>("LoginHistory", LoginHistorySchema);

export default LoginHistoryModel;
