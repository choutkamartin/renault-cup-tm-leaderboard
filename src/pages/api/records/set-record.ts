import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import Record from "@/models/Record";
import dbConnect from "@/lib/dbConnect";
import mstoTime from "@/utils/msToTime";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    await dbConnect();

    const data = JSON.parse(req.body);
    if (!session) return res.status(401).end();

    const user = await fetch("https://api.trackmania.com/api/user", {
      headers: { Authorization: `Bearer ${session.token.access_token}` },
    }).then((res) => res.json());
    if (user.accountId === session.token.sub) {
      await Record.findOneAndUpdate(
        {
          accountId: user.accountId,
          mapId: req.query.mapId,
        },
        { time: data.time, updatedAt: Date.now() },
        { upsert: true }
      );
      return res.status(200).json({
        message: `Byl nastaven čas ${mstoTime(
          data.time
        )}. Do pěti minut bude čas aktualizován v tabulce. Toto okno můžeš nyní uzavřít.`,
      });
    } else {
      return res.status(409).json({ message: data.time });
    }
  } catch (error) {
    console.log(error);
  }
}
