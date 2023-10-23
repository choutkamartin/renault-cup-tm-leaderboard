import Layout from "@/components/Layout";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  const themeLight = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#fce601" },
      secondary: { main: "#272727" },
    },
  });

  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
