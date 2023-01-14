import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../../theme'
import { ServerStyleSheets } from '@mui/styles'

// class MyDocument extends Document {
//     static async getInitialProps(ctx) {
//         const originalRenderPage = ctx.renderPage
//         const sheets = new ServerStyleSheets()

//         // Run the React rendering logic synchronously
//         ctx.renderPage = () =>
//             originalRenderPage({
//                 // Useful for wrapping the whole react tree
//                 enhanceApp: (App) => App,
//                 // Useful for wrapping in a per-page basis
//                 enhanceComponent: (Component) => Component,
//             })

//         // Run the parent `getInitialProps`, it now includes the custom `renderPage`
//         const initialProps = await Document.getInitialProps(ctx)

//         return {
//             ...initialProps,
//             styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement]
//         }
//     }

//     render() {
//         return (
//             <Html>
//                 <Head>
//                     <meta name="theme-color" content={theme.palette.primary.main} />
//                 </Head>
//                 <body>
//                     <Main />
//                     <NextScript />
//                 </body>
//             </Html>
//         )
//     }
// }

// export default MyDocument


export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
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

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};