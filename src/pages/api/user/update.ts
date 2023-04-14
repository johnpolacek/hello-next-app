import { NextApiRequest, NextApiResponse } from "next";
import {
  updateUser,
  UpdateUserOptions,
  UpdateUserResult,
} from "@/lib/firebase/admin/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { uid, options } = req.body as {
      uid: string;
      options: UpdateUserOptions;
    };

    if (!uid || typeof uid !== "string") {
      return res.status(400).json({ message: "User ID is required." });
    }

    try {
      const result: UpdateUserResult = await updateUser(uid, options);
      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while updating the user.", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed. Use POST." });
  }
};

export default handler;
