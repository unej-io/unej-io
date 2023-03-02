import Document, { Head, Html, Main, NextScript } from "next/document";

import { GET_INITIAL_PROPS } from "@unej-io/ui/next";

class _Document extends Document {
  static getInitialProps = GET_INITIAL_PROPS;

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;
