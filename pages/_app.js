import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import AuthContextProvider from "../context/useAuthContext";
import SidebarContextProvider from "../context/useSidebarContext";
import UIContextProvider from "../context/useUIContext";
import theme from "../src/theme";
import "../styles/globals.css";

const TransitionsModal = dynamic(() => import("../components/ui/Modal"), {
  ssr: false,
});
const Loader = dynamic(() => import("../components/ui/Loader"), {
  ssr: false,
});

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <UIContextProvider>
          <AuthContextProvider>
            <SidebarContextProvider>
              <CssBaseline />
              <TransitionsModal />
              <Loader/>
              <Component {...pageProps} />
            </SidebarContextProvider>
          </AuthContextProvider>
        </UIContextProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
