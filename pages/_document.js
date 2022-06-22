import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ar">
        <Head>
          <meta name="theme-color" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link
            href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
            rel="stylesheet"
          />

          <link rel="icon" type="image/png" href="/images/favicon-01.png" />
        </Head>
        <body dir="rtl" style={{ fontFamily: ' "Cairo", sans-serif' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
