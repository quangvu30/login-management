import { Schema, model, models } from "mongoose";
import { TokenType } from "@/constant/enum";

export interface IToken {
  token: string;
  type: TokenType;
  expires: Date;
  active: boolean;
  user: Schema.Types.ObjectId;
}

const TokenSchema = new Schema<IToken>(
  {
    token: { type: String, unique: true, required: true },
    type: { type: String, enum: TokenType },
    expires: { type: Date },
    active: { type: Boolean, default: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const TokenModel = models.Token || model<IToken>("Token", TokenSchema);

export default TokenModel;
