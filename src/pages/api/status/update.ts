import { NextApiRequest, NextApiResponse } from "next";
import { saveStatus } from "@/lib/firebase/admin/status";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { status } = req.body;
  const authHeader = req.headers.authorization;

  if (!status || !authHeader) {
    return res.status(400).json({ message: "Missing status or user token" });
  }

  const userToken = authHeader.replace("Bearer ", ""); // Remove the "Bearer " part from the token

  try {
    const result = await saveStatus(status, userToken);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res
        .status(500)
        .json({ message: result.message, error: result.error });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to save status.", error });
  }
};

export default handler;
