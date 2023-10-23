import getToken from "./getToken";
import players from "./players";

const getRecords = async (id: string) => {
  const accessToken = await getToken();

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
  )
    .then((res) => res.json())
    .then((data) =>
      data.sort(
        (a: any, b: any) =>
          parseFloat(a.recordScore.time) - parseFloat(b.recordScore.time)
      )
    );
  return records;
};

export default getRecords;
