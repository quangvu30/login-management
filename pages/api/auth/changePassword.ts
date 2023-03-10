import { dbConnect } from "@/config/database";
import { changePassword, resetPassword } from "@/modules/users/user.controller";
import {
  ChangePasswordDto,
  ResetPasswordDto,
} from "@/modules/users/dto/changePass.dto";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import * as _ from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "PUT":
      const userChange = await changePassword(req.body as ChangePasswordDto);
      if (_.isError(userChange)) {
        return res
          .status(400)
          .json({ success: false, error: userChange.message });
      }
      return res.status(200).json({ success: true, data: userChange });
    case "PATCH":
      const { email } = req.body;
      const userReset = await resetPassword(email);
      if (_.isError(userReset))
        return res
          .status(400)
          .json({ success: false, error: userReset.message });
      return res.status(200).json({ success: true, data: userReset });
  }
  res.status(400).json({ success: false });
}
