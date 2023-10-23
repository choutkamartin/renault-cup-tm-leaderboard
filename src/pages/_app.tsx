import Layout from "@/components/Layout";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const themeLight = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#fce601" },
      secondary: { main: "#272727" },
    },
  });

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={themeLight}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default App;
