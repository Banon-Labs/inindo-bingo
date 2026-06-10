// Playwright config for the Inindo Bingo demo. Serves the static site (the
// parent dir) over HTTP so ES-module + wasm loading works, records video of
// the whole showcase, and writes screenshots under artifacts/.
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 120_000,
  outputDir: "./artifacts/trace",
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:8799",
    viewport: { width: 900, height: 1000 },
    deviceScaleFactor: 2,
    video: { mode: "on", size: { width: 900, height: 1000 } },
    trace: "off",
  },
  webServer: {
    command: "python3 -m http.server 8799 --bind 127.0.0.1 --directory ..",
    url: "http://127.0.0.1:8799/index.html",
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
