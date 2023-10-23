import dbConnect from "@/lib/dbConnect";
import getToken from "./getToken";
import players from "./players";
import Record from "@/models/Record";

const getRecords = async (id: string) => {
  const accessToken = await getToken();

  await dbConnect();

  const mapInfo = await fetch(
    `https://prod.trackmania.core.nadeo.online/maps/?mapUidList=${id}`,
    {
      headers: {
        Authorization: `nadeo_v1 t=${accessToken}`,
      },
    }
  ).then((res) => res.json());

  const records = await fetch(
    `https://prod.trackmania.core.nadeo.online/mapRecords/?accountIdList=${players
      .map((player: any) => player.id)
      .join(",")}&mapIdList=${mapInfo.map((map: any) => map.mapId).join(",")}`,
    {
      headers: {
        Authorization: `nadeo_v1 t=${accessToken}`,
      },
    }
  ).then((res) => res.json());

  const recordsFromDb = await Record.find({ mapId: id });
  if (recordsFromDb.length > 1) {
    const updatedRecords = records
      .map((record: any) => {
        const { time, updatedAt } = recordsFromDb.find(
          (item) => item.accountId === record.accountId
        );

        return {
          ...record,
          updatedAt,
          recordScore: { ...record.recordScore, updatedTime: time },
        };
      })
      .sort(
        (a: any, b: any) =>
          parseFloat(
            a.recordStore.updatedTime
              ? a.recordStore.updatedTime
              : a.recordScore.time
          ) -
          parseFloat(
            b.recordStore.updatedTime
              ? b.recordStore.updatedTime
              : b.recordScore.time
          )
      );
    return updatedRecords;
  }

  return records;
};

export default getRecords;
