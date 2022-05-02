import type { AppProps } from "next/app";

import { SWRConfig } from "swr";
import Head from "next/head";

import "normalize.css";
import "../styles/styles.scss";
import fetcher from "../libs/fetcher";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
        <title>Rose June Taylor Coaching</title>
      </Head>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
export default MyApp;
