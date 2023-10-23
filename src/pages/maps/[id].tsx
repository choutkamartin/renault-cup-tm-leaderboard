import { GetStaticProps } from "next";
import mstoTime from "@/utils/msToTime";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Tooltip,
  Typography,
  Button,
  Modal,
  Alert,
} from "@mui/material";
import getMap from "@/utils/getMap";
import maps from "@/utils/mapIds";
import getRecords from "@/utils/getRecords";
import removeCharacters from "@/utils/removeCharacters";
import findUser from "@/utils/findUser";
import QuestionIcon from "@mui/icons-material/QuestionMark";
import { useSession } from "next-auth/react";
import { useState } from "react";
import TimeInput from "@/components/TimeInput";
import { useRouter } from "next/router";
import { red } from "@mui/material/colors";

const Map = ({ records, map }: any) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [milliseconds, setMilliseconds] = useState<number>(0);

  const [message, setMessage] = useState("");

  const mapId = router.query.id as string;

  const alterTime = async () => {
    const totalMilliseconds =
      milliseconds + seconds * 1000 + minutes * 60 * 1000;

    const data = await fetch(
      `/api/records/set-record?mapId=${router.query.id}`,
      {
        method: "POST",
        body: JSON.stringify({
          mapId: mapId,
          time: totalMilliseconds,
        }),
      }
    ).then((res) => res.json());

    setMessage(data.message);
  };

  if (!map || !records || status === "loading") return <div>Načítání...</div>;

  return (
    <>
      <Card sx={{ mb: 4 }}>
        <CardMedia sx={{ height: 256 }} image={map.thumbnailUrl} title="Mapa" />
        <CardContent>
          <Typography variant="h5" component="div">
            {removeCharacters(map.name)}
          </Typography>
        </CardContent>
      </Card>
      <Alert severity="warning" variant="outlined" sx={{ mb: 4 }}>
        Časy byly po turnaji uzamčeny a již se nezmění.
      </Alert>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Pozice</TableCell>
              <TableCell>Jméno hráče</TableCell>
              <TableCell align="center">Čas</TableCell>
              <TableCell align="center">Datum zajetí rekordu</TableCell>
              <TableCell align="left">Vysvětlivky</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record: any, index: number) => {
              const dateOfRecord = new Date(record.timestamp);
              const tournamentLaunchDate = new Date("2023-10-22T19:50:00");

              const drivenBeforeLaunch =
                tournamentLaunchDate.getTime() > dateOfRecord.getTime();
              const sameUser = record.accountId === session?.token?.sub;
              return (
                <TableRow key={record.accountId}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link
                      href={`https://trackmania.io/#/player/${record.accountId}`}
                      target="_blank"
                    >
                      {findUser(record.accountId)}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {drivenBeforeLaunch && record.recordScore.updatedTime && (
                      <Box>{mstoTime(record.recordScore.updatedTime)}</Box>
                    )}
                    <Box
                      sx={{
                        textDecoration:
                          drivenBeforeLaunch && record.recordScore.updatedTime
                            ? "line-through"
                            : "initial",
                        color: drivenBeforeLaunch ? red[500] : "secondary",
                      }}
                    >
                      {mstoTime(record.recordScore.time)}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {drivenBeforeLaunch && record.recordScore.updatedTime && (
                      <Box>
                        {new Date(record.updatedAt).toLocaleDateString("cs")}{" "}
                        {new Date(record.updatedAt).toLocaleTimeString("cs")}
                      </Box>
                    )}
                    <Box
                      sx={{
                        textDecoration:
                          drivenBeforeLaunch && record.recordScore.updatedTime
                            ? "line-through"
                            : "initial",
                        color: drivenBeforeLaunch ? red[500] : "secondary",
                      }}
                    >
                      {new Date(record.timestamp).toLocaleDateString("cs")}{" "}
                      {new Date(record.timestamp).toLocaleTimeString("cs")}
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    {drivenBeforeLaunch && (
                      <Box sx={{ display: "flex", columnGap: 4 }}>
                        <Tooltip
                          title={
                            record.updatedAt
                              ? "Hráč zajel lepší čas mimo turnaj. Čas byl proto upraven na ten, který zajel v rámci turnaje."
                              : "Hráč zajel tento rekord před oficiálním zahájením turnaje. Tento čas proto nelze brát jako směrodatný. Trackmania bohužel neposkytuje (neukládá) více zajetých časů, pouze čas nejlepší."
                          }
                        >
                          <IconButton size="small">
                            <QuestionIcon />
                          </IconButton>
                        </Tooltip>
                        {sameUser && (
                          <Button
                            variant="contained"
                            onClick={() => {
                              handleOpen();
                            }}
                          >
                            Aktualizovat
                          </Button>
                        )}
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "xl",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            sx={{ marginBottom: 2 }}
            component="h2"
            gutterBottom
          >
            Úprava času
          </Typography>
          <TimeInput
            setMilliseconds={setMilliseconds}
            setSeconds={setSeconds}
            setMinutes={setMinutes}
            milliseconds={milliseconds}
            seconds={seconds}
            minutes={minutes}
          />
          <Button variant="contained" onClick={alterTime}>
            Aktualizovat čas
          </Button>
          {message && (
            <Alert variant="outlined" severity="success" sx={{ marginTop: 4 }}>
              {message}
            </Alert>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Map;

export const getStaticPaths = async () => {
  return {
    paths: maps.map((map) => ({ params: { id: map } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const map = await getMap(params?.id as string);
  const records = await getRecords(params?.id as string);
  return {
    props: { map, records: JSON.parse(JSON.stringify(records)) },
  };
};
