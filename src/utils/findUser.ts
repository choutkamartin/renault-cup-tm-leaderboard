import players from "./players";

const findPlayer = (id: string) => {
  return players.find((player) => player.id === id)?.name;
};

export default findPlayer;
