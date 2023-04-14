import { NextApiRequest, NextApiResponse } from "next";
import { getRecentStatuses, Status } from "@/lib/firebase/admin/status";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }

  const startAfterTimestamp = req.query.startAfter
    ? parseInt(req.query.startAfter as string)
    : undefined;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string)
    : 24;

  try {
    const result: {
      statuses: Status[];
      lastTimestamp: number | null;
    } = await getRecentStatuses(startAfterTimestamp, pageSize);

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch recent statuses.", error });
  }
};

export default handler;
