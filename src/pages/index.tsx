import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";

const Index = () => {
  return (
    <Card sx={{ mb: 4 }}>
      <CardMedia sx={{ height: 256 }} image="/bg.webp" title="green iguana" />
      <CardContent>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{ marginBottom: 2 }}
        >
          Renault Twitch Cup
        </Typography>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{ marginBottom: 2 }}
        >
          Trackmania - Tabulka s živými časy
        </Typography>
        <Typography
          variant="body2"
          component="div"
          gutterBottom
          sx={{ marginBottom: 2 }}
        >
          Webová stránka slouží k zobrazení živých časů závodníků v rámci
          turnaje Renault Twitch Cup ve hře Trackmania.
        </Typography>
        <Typography
          variant="body2"
          component="div"
          gutterBottom
          sx={{ marginBottom: 2 }}
        >
          Časy jsou aktualizovány každých 5 minut.
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{ marginBottom: 2 }}
        >
          Aktualizace zajetých časů
        </Typography>
        <Typography
          variant="body2"
          component="div"
          gutterBottom
          sx={{ marginBottom: 2 }}
        >
          Jsi streamer a některé tebou zajeté časy jsou &apos;červené&apos;?
          Svůj čas můžeš aktualizovat. Přihlaš se, přejdi na konkrétní mapu a
          svůj čas budeš moci upravit. Přihlásit se musíš stejným účtem, který
          používáš v Trackmanii.
        </Typography>
        <Button onClick={() => signIn("trackmania")} variant="outlined">
          Přihlásit se
        </Button>
      </CardContent>
    </Card>
  );
};

export default Index;
