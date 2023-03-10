import { getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { dbConnect } from "@/config/database";
import * as _ from "lodash";
import { getLoginHistory } from "@/modules/loginHistory/loginHistory.controller";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { IUser } from "@/modules/users/user.model";
import { GetLoginHistoryDto } from "@/modules/loginHistory/dto/getLoginHistories.dto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { page, limit, email },
  } = req;
  console.log(email);

  const session = await getServerSession(req, res, authOptions);
  await dbConnect();
  switch (method) {
    case "GET":
      const user = session?.user as IUser;
      console.log(user.role);
      if (email === undefined) {
        const getLoginHistoryDto: GetLoginHistoryDto = {
          page: Number(page),
          limit: Number(limit),
          email: user.email,
        };
        const loginHistories = await getLoginHistory(getLoginHistoryDto);
        if (_.isError(loginHistories)) {
          return res
            .status(400)
            .json({ success: false, error: loginHistories.message });
        }
        return res.status(200).json({ success: true, data: loginHistories });
      } else {
        const getLoginHistoryDto: GetLoginHistoryDto = {
          page: Number(page),
          limit: Number(limit),
          email: String(email),
        };
        const loginHistories = await getLoginHistory(getLoginHistoryDto);
        if (_.isError(loginHistories)) {
          return res
            .status(400)
            .json({ success: false, error: loginHistories.message });
        }
        return res.status(200).json({ success: true, data: loginHistories });
      }
  }
  res.status(400).json({ success: false });
}
