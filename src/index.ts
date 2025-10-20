import * as http from "http";
import { loadEnvFromSecret } from "./secret";

async function main() {
  // Pull config once at startup. Secret name defaults to APP_ENV, can be overridden
  const secretId = process.env.SECRET_ID || "APP_ENV";
  await loadEnvFromSecret(secretId);

  const port = Number(process.env.PORT || 8080);

  const server = http.createServer((req, res) => {
    if (!req.url) return;

    if (req.url === "/" || req.url.startsWith("/ping")) {
      const name = process.env.APP_NAME || "sm-demo";
      const ver = process.env.APP_VERSION || "dev";
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, app: name, version: ver }));
      return;
    }

    if (req.url.startsWith("/debug")) {
      // WARNING: Don’t expose secrets in production. This is for demo only.
      const safe = {
        APP_NAME: process.env.APP_NAME,
        APP_VERSION: process.env.APP_VERSION,
        PORT: process.env.PORT,
        COOL_FEATURE: process.env.COOL_FEATURE,
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ env: safe }, null, 2));
      return;
    }

    res.writeHead(404);
    res.end("Not found");
  });

  server.listen(port, () => {
    console.log(`HTTP server listening on :${port}`);
  });
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
