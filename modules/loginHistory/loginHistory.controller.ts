import * as _ from "lodash";

import { IUser } from "@/modules/users/user.model";
import LoginHistoryModel from "./loginHistory.model";
import { getUser } from "../users/user.controller";
import { GetLoginHistoryDto } from "./dto/getLoginHistories.dto";

export const createLoginHistory = async (ipAddress: string, user: IUser) => {
  const loginHistory = await LoginHistoryModel.create({
    ipAddress,
    user,
  });

  return loginHistory;
};

export const getLoginHistory = async (getLoginHistoriy: GetLoginHistoryDto) => {
  const u = await getUser(String(getLoginHistoriy.email));
  if (_.isError(u)) {
    return u;
  }
  const loginHistories = await LoginHistoryModel.find({ user: u })
    .limit(getLoginHistoriy.limit)
    .skip((getLoginHistoriy.page - 1) * getLoginHistoriy.limit);

  const count = await LoginHistoryModel.countDocuments();
  return {
    loginHistories,
    totalPages: Math.ceil(count / getLoginHistoriy.limit),
    currentPage: getLoginHistoriy.page,
  };
};
