const mstoTime = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = (millis % 60000) / 1000;

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default mstoTime;
