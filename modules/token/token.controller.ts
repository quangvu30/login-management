import * as _ from "lodash";

import { IUser } from "@/modules/users/user.model";
import { randomString } from "@/utils/random";
import TokenModel from "./token.model";
import { TokenType } from "@/constant/enum";

export const createToken = async (user: IUser, tokenType: TokenType) => {
  const tokenString = randomString(40);
  const token = await TokenModel.create({
    token: tokenString,
    type: tokenType,
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15p
    active: true,
    user,
  });

  return token;
};

export const getToken = async (tokenString: string) => {
  const token = await TokenModel.findOne({ token: tokenString });
  if (_.isNull(token)) {
    return new Error("Token not found");
  }

  if (!token.active) {
    return new Error("Token not active");
  }

  // check expired
  const dateNow = new Date(Date.now());
  const dateToken = new Date(token.expires);
  if (dateNow > dateToken) {
    return new Error("Token expired");
  }
  return token;
};

export const disableToken = async (tokenString: string) => {
  const token = await TokenModel.findOne({ token: tokenString });
  if (_.isNull(token)) {
    return new Error("Token not found");
  }

  token.active = false;
  await token.save();
  return token;
};
