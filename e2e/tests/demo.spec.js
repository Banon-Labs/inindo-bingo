// Full-feature showcase of the Inindo Bingo site: dev-mode seed lock for a
// deterministic round, the gold -> chips -> wager loop, the auto-played round
// (called numbers, specials, payout), and the clickable casino map including
// Mikawa's high-stakes rejection. Records video + ordered screenshots.
import { test, expect } from "@playwright/test";

const SHOTS = "artifacts/shots";
const shot = (page, name) =>
  page.screenshot({ path: `${SHOTS}/${name}.png`, animations: "disabled" });

// Start every run from a clean slate so the demo is reproducible.
test.use({ storageState: { cookies: [], origins: [] } });

test("bingo full-feature demo", async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());

  // --- Game page: initial state ---
  await page.goto("/index.html");
  await expect(page.locator("#gold")).not.toHaveText("0"); // wasm initialised
  await expect(page.locator("#chips")).toHaveText("0");
  await shot(page, "01-arrive-with-gold");

  // --- Dev mode: lock the RNG seed for a deterministic round ---
  await page.locator("#devMode").check();
  const seed = page.locator("#knob_rng_state");
  await expect(seed).toBeEnabled();
  await seed.fill("00BC614E");
  await shot(page, "02-dev-mode-knobs");
  await page.locator("#applyKnobs").click();
  await expect(page.locator("#message")).toContainText("locked");

  // --- Buy chips with gold at the counter ---
  await page.locator("#buyQty").fill("60");
  await page.locator("#buy").click();
  await expect(page.locator("#message")).toContainText("Bought");
  await expect(page.locator("#chips")).toHaveText("60");
  await shot(page, "03-bought-chips");

  // --- Wager and watch the round auto-play ---
  await page.locator("#bet").fill("10");
  await page.locator("#start").click();
  // A number gets called and cells start marking.
  await page.waitForFunction(
    () => document.querySelectorAll("#card .cell.marked").length >= 3,
    { timeout: 30_000 },
  );
  await shot(page, "04-round-in-progress");

  // Drive any selection specials (the player picks squares), then let the
  // round resolve to a payout / no-win.
  await page.waitForFunction(
    () => {
      const pickable = document.querySelectorAll("#card .cell.pickable");
      if (pickable.length) { pickable[0].click(); return false; }
      const m = document.getElementById("message").textContent;
      return /Payout|No win|BINGO/.test(m);
    },
    { timeout: 60_000 },
  );
  await shot(page, "05-round-result");

  // --- Casino map of Japan ---
  await page.goto("/map.html");
  await page.waitForSelector("#land");
  await page.waitForFunction(
    () => document.querySelectorAll(".town.casino").length >= 3,
  );
  await shot(page, "06-casino-map");

  // --- Mikawa high-stakes rejection (the original discovery) ---
  await page.locator("#parlor").selectOption("high");
  await page.locator('.town.casino[title="Mikawa"]').click();
  await page.locator("#gold").fill("50");
  await expect(page.locator("#townName")).toContainText("Mikawa");
  await expect(page.locator("#verdict")).toHaveClass(/reject/);
  await shot(page, "07-mikawa-rejected-50-gold");

  // --- Same door, now wealthy enough to enter ---
  await page.locator("#gold").fill("9999");
  await expect(page.locator("#verdict")).not.toHaveClass(/reject/);
  await shot(page, "08-mikawa-welcome-rich");
});
