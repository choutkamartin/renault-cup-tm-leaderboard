import { GetStaticProps } from "next";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
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

  return (
    <Grid container spacing={4}>
      {maps.map((map: any) => (
        <Grid item xs={6} key={map.mapUid}>
          <Card>
            <CardMedia
              sx={{ height: 196 }}
              image={map.thumbnailUrl}
              title="Mapa"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {removeCharacters(map.name)}
              </Typography>
              <Button
                onClick={() => router.push(`/maps/${map.mapUid}`)}
                variant="outlined"
              >
                Časy
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Maps;

export const getStaticProps: GetStaticProps = async () => {
  const maps = await getMaps(mapIds);
  return { props: { maps } };
};
