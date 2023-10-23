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
  let updatedRecords = records;
  if (recordsFromDb.length > 0) {
    updatedRecords = records.map((record: any) => {
      const data = recordsFromDb.find(
        (item) => item.accountId === record.accountId
      );

      return {
        ...record,
        updatedAt: data?.updatedAt,
        recordScore: { ...record.recordScore, updatedTime: data?.time },
      };
    });
  }
  return updatedRecords.sort(
    (a: any, b: any) =>
      parseFloat(
        a.recordScore.updatedTime
          ? a.recordScore.updatedTime
          : a.recordScore.time
      ) -
      parseFloat(
        b.recordScore.updatedTime
          ? b.recordScore.updatedTime
          : b.recordScore.time
      )
  );
};

export default getRecords;
