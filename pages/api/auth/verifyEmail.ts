import { dbConnect } from "@/config/database";
import { activeAccout } from "@/modules/users/user.controller";

import type { NextApiRequest, NextApiResponse } from "next";
import * as _ from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  console.log(req.body);

  await dbConnect();
  if (method === "POST") {
    const { token } = req.body;
    const user = await activeAccout(token as string);
    if (_.isError(user)) {
      res.status(400).json({ success: false, error: user.message });
      return;
    }

    res.status(200).json({ success: true, data: user });
    return;
  }
  res.status(400).json({ success: false });
}
