import NextDocument, { Head, Main, NextScript } from 'next/document';
import { loadGetInitialProps } from 'next/dist/lib/utils';

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    return {
      ...await loadGetInitialProps(NextDocument, ctx),
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <title>Relate</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" async />
          <link href="/static/nprogress.css" rel="stylesheet" type="text/css" async />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <style jsx global>{`
          a {
            color: #02697C;
            text-decoration: none;
          }

          body {
            margin: 0;
          }
        `}</style>
        <style jsx>{`
          body {
            display: flex;
            flex-direction: column;
            font-family: Raleway, "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 85%;
            margin: 0 auto;
            max-width: 960px;
            min-height: 100%;
            padding: 0 16px;
          }
        `}</style>
      </html>
    );
  }
}
