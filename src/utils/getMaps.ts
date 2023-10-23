import getToken from "./getToken";

const getMaps = async (ids: string[]) => {
  const accessToken = await getToken();

  const maps = await fetch(
    `https://prod.trackmania.core.nadeo.online/maps/?mapUidList=${ids.join(
      ","
    )}`,
    {
      headers: {
        Authorization: `nadeo_v1 t=${accessToken}`,
      },
    }
  ).then((res) => res.json());

  return maps;
};

export default getMaps;
