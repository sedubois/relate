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
      </html>
    );
  }
}
