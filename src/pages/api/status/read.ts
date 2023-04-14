import { NextApiRequest, NextApiResponse } from "next";
import { getCurrentStatus } from "@/lib/firebase/admin/status";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ message: "Missing user token" });
  }

  const userToken = authHeader.replace("Bearer ", "");

  try {
    const result = await getCurrentStatus(userToken);
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json({
        message: "Failed to read status",
        error: "Failed to read status",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to read status.", error });
  }
};

export default handler;
