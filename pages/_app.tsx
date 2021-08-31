// React and Next
import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
// Redux
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
// Material-UI
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "@/styles/theme";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  // @ts-expect-error
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <React.Fragment>
      <Head>
        <title>Git-dash</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}
