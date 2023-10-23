import mapIds from "@/utils/mapIds";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    for (const mapId of mapIds) {
      await res.revalidate(`/maps/${mapId}`);
    }
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
