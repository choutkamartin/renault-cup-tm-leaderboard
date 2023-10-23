import { Container } from "@mui/material";
import AppBar from "@/components/AppBar";
import BottomNav from "@/components/BottomNav";
import { ReactNode } from "react";
import Head from "next/head";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Renault Twitch Cup Trackmania</title>
      </Head>
      <AppBar />
      <Container maxWidth="md" sx={{ paddingY: 16 }}>
        {children}
      </Container>
      <BottomNav />
    </>
  );
};

export default Layout;
