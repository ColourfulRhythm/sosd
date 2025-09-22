// see: https://medium.com/suyeonme/nextjs-getting-started-with-next-js-62f5fcbb7536
// also: https://johnny.am/blog/n2-adding-google-fonts-to-nextjs-project
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
            rel="stylesheet"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap"
            rel="stylesheet"
          />

          {/* Open Graph tags */}
          <meta
            property="og:title"
            content="Explore The World Of Seamless Online Promotion"
          />
          <meta property="og:image" content="https://i.imgur.com/m4JOcII.png" />
          <meta
            property="og:description"
            content="AD-Promoter is a digital serviced based app that offers a result-oriented strategy for global brand growth. It creates unlimited access to transform brands into bigger ones by allowing users to reach multiple target audiences in various locations with a few clicks and a custom budget."
          />
          <meta property="og:url" content="https://app.ad-promoter.com/" />
          <meta property="og:type" content="website" />

          {/* Fallback image in case the og:image is not available */}
          <meta
            property="og:image:secure_url"
            content="https://i.imgur.com/m4JOcII.png"
          />

          {/* Twitter card meta tags (optional, for Twitter sharing) */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@adpromoter_" />
          <meta
            name="twitter:title"
            content="Explore The World Of Seamless Online Promotion"
          />
          <meta
            name="twitter:description"
            content="AD-Promoter is a digital serviced based app that offers a result-oriented strategy for global brand growth. It creates unlimited access to transform brands into bigger ones by allowing users to reach multiple target audiences in various locations with a few clicks and a custom budget."
          />
          <meta
            name="twitter:image"
            content="https://i.imgur.com/m4JOcII.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
