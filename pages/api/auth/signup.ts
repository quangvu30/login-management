import type { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "@/modules/users/user.controller";
import { dbConnect } from "@/config/database";
import { SignUpDto } from "@/modules/users/dto/signup.dto";
import _ from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  console.log(req.body);

  await dbConnect();
  if (method == "POST") {
    try {
      const user = await createUser(req.body as SignUpDto);

      if (_.isError(user)) {
        return res.status(400).json({ success: false, error: user.message});
      }
      return res.status(201).json({ success: true, data: user });
      
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
  return res.status(400).json({ success: false });
}
