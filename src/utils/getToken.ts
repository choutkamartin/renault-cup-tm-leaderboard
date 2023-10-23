const getToken = async () => {
  const { accessToken } = await fetch(
    "https://prod.trackmania.core.nadeo.online/v2/authentication/token/basic",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `renault-twitch-cup:pxHMv/?Z[9vgvI0s`
        ).toString("base64")}`,
      },
    }
  ).then((res) => res.json());

  return accessToken;
};

export default getToken;
