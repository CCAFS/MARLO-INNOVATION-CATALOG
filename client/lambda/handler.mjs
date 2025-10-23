// AWS Lambda entry point bridging Astro's Node handler via serverless-http.
import http from 'node:http';
import serverlessHttp from 'serverless-http';

let cachedHandler;

async function getServerlessHandler() {
  if (!cachedHandler) {
    const { handler: astroHandler } = await import('../dist/server/entry.mjs');

    const httpServer = http.createServer((req, res) => {
      try {
        const maybePromise = astroHandler(req, res);

        if (maybePromise && typeof maybePromise.catch === 'function') {
          maybePromise.catch((err) => {
            console.error('[Astro] Unhandled error in request handler', err);
            if (!res.headersSent) {
              res.statusCode = 500;
              res.end('Internal Server Error');
            }
          });
        }
      } catch (err) {
        console.error('[Astro] Error creating response', err);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end('Internal Server Error');
        }
      }
    });

    cachedHandler = serverlessHttp(httpServer);
  }

  return cachedHandler;
}

export const handler = async (event, context) => {
  const server = await getServerlessHandler();
  return server(event, context);
};
