import getToken from "./getToken";

const getMap = async (id: string) => {
  const accessToken = await getToken();

  const maps = await fetch(
    `https://prod.trackmania.core.nadeo.online/maps/?mapUidList=${id}`,
    {
      headers: {
        Authorization: `nadeo_v1 t=${accessToken}`,
      },
    }
  ).then((res) => res.json());

  return maps[0];
};

export default getMap;
