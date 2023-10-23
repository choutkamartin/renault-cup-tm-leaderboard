import { GetStaticProps } from "next";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import getMaps from "@/utils/getMaps";
import getData from "@/utils/getToken";
import mapIds from "@/utils/mapIds";
import removeCharacters from "@/utils/removeCharacters";

const Maps = ({ maps }: any) => {
  const router = useRouter();

  if (!maps) return <div>Načítání...</div>;

  return maps.map((map: any) => (
    <Card sx={{ mb: 4 }} key={map.mapUid}>
      <CardMedia sx={{ height: 256 }} image={map.thumbnailUrl} title="Mapa" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {removeCharacters(map.name)}
        </Typography>
        <Typography variant="body1" component="div">
          Autor: {map.submitter}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => router.push(`/maps/${map.mapUid}`)}>Časy</Button>
      </CardActions>
    </Card>
  ));
};

export default Maps;

export const getStaticProps: GetStaticProps = async () => {
  const maps = await getMaps(mapIds);
  return { props: { maps } };
};
