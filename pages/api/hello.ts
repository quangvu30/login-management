import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@/modules/users/user.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const user = await getUser(session?.user?.email || "");
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
