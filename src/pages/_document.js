import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="uz">
      <Head>
        <link rel="icon" href="/images/gerb.png" type="image/png" />
        <meta charSet="utf-8" />
        <meta name="description" content="АНТИКОР ДАСТУР ИЭС АЖ - Korrupsiyaga qarshi kurashish platformasi" />
        <meta name="theme-color" content="#0f2c59" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
