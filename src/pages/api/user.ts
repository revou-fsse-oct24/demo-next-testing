import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../types/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const user = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
  };

  res.status(200).json(user);
}
