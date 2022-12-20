import "../styles/globals.css";
import Script from "next/script";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
  return <Component {...pageProps} />;
}

export default MyApp;
