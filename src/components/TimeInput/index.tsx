import { Grid, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

const TimeInput = ({
  setMilliseconds,
  setSeconds,
  setMinutes,
  milliseconds,
  seconds,
  minutes,
}: {
  setMilliseconds: Dispatch<SetStateAction<number>>;
  setSeconds: Dispatch<SetStateAction<number>>;
  setMinutes: Dispatch<SetStateAction<number>>;
  milliseconds: number;
  seconds: number;
  minutes: number;
}) => {
  const handleMinutesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinutes(parseInt(event.target.value));
  };

  const handleSecondsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSeconds(parseInt(event.target.value));
  };

  const handleMillisecondsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMilliseconds(parseInt(event.target.value));
  };

  return (
    <Grid container spacing={2} sx={{ marginBottom: 4 }}>
      <Grid item xs={4}>
        <TextField
          label="Minuty"
          value={minutes}
          onChange={handleMinutesChange}
          type="number"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Vteřiny"
          value={seconds}
          onChange={handleSecondsChange}
          type="number"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Milisekundy"
          value={milliseconds}
          onChange={handleMillisecondsChange}
          type="number"
        />
      </Grid>
    </Grid>
  );
};

export default TimeInput;
