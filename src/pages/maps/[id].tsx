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
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import getMap from "@/utils/getMap";
import maps from "@/utils/mapIds";
import getRecords from "@/utils/getRecords";
import removeCharacters from "@/utils/removeCharacters";
import findUser from "@/utils/findUser";
import QuestionIcon from "@mui/icons-material/QuestionMark";

const Map = ({ records, map }: any) => {
  if (!map || !records) return <div>Načítání...</div>;

  return (
    <>
      <Card sx={{ mb: 4 }}>
        <CardMedia sx={{ height: 256 }} image={map.thumbnailUrl} title="Mapa" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {removeCharacters(map.name)}
          </Typography>
          <Typography variant="body1" component="div">
            Autor: {map.author}
          </Typography>
        </CardContent>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Pozice</TableCell>
              <TableCell>Jméno hráče</TableCell>
              <TableCell align="center">Čas</TableCell>
              <TableCell align="center">Datum zajetí rekordu</TableCell>
              <TableCell align="center">Vysvětlivky</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record: any, index: number) => {
              const dateOfRecord = new Date(record.timestamp);
              const tournamentLaunchDate = new Date("2023-10-22T19:50:00");

              const drivenBeforeLaunch =
                tournamentLaunchDate.getTime() > dateOfRecord.getTime();

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
                    {mstoTime(record.recordScore.time)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: drivenBeforeLaunch ? "red" : "secondary" }}
                  >
                    {new Date(record.timestamp).toLocaleDateString()}{" "}
                    {new Date(record.timestamp).toLocaleTimeString()}
                  </TableCell>
                  <TableCell align="center">
                    {drivenBeforeLaunch && (
                      <Tooltip title="Hráč zajel tento rekord před oficiálním zahájením turnaje. Tento čas proto nelze brát jako směrodatný. Trackmania bohužel neposkytuje (neukládá) více zajetých časů, pouze čas nejlepší.">
                        <IconButton size="small">
                          <QuestionIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
  return { props: { map, records }, revalidate: 60 * 5 };
};
