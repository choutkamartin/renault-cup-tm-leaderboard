import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Index = () => {
  return (
    <Card sx={{ mb: 4 }}>
      <CardMedia sx={{ height: 256 }} image="/bg.webp" title="green iguana" />
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          Renault Twitch Cup
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          Trackmania - Tabulka s živými časy
        </Typography>
        <Typography variant="body2" component="div" gutterBottom>
          Webová stránka slouží k zobrazení živých časů závodníků v rámci
          turnaje Renault Twitch Cup ve hře Trackmania.
        </Typography>
        <Typography variant="body2" component="div">
          Časy jsou aktualizovány každých 5 minut.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Index;
