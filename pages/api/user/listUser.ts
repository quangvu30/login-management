import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";
import { getAllUser } from "@/modules/users/user.controller";
import * as _ from "lodash";
import { dbConnect } from "@/config/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  switch (method) {
    case "GET":
      if (session?.user?.role === "admin") {
        const listUsers = await getAllUser();
        return res.status(200).json({ success: true, data: listUsers });
      }
      break;
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
