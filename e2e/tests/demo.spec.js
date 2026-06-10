// Full-feature showcase of the Inindo Bingo site: dev-mode seed lock for a
// deterministic round, the gold -> chips -> wager loop, the tap-driven spinner
// round (the wheel free-runs; the player presses Space / clicks the wheel to
// daub the shown number, and picks squares on free-selection specials), and the
// clickable casino map including Mikawa's high-stakes rejection. Records video
// + ordered screenshots.
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

  // --- Wager and play the tap-driven spinner round ---
  await page.locator("#bet").fill("10");
  await page.locator("#start").click();

  // The wheel free-runs (spinning) but nothing marks until the player taps.
  await expect(page.locator("#called")).toHaveClass(/spinning/);
  // Confirm the no-tap invariant: the shown number advances on its own, yet
  // zero cells are marked while we never tap.
  const wheelStart = await page.locator("#called").textContent();
  await page.waitForFunction(
    (start) => document.getElementById("called").textContent !== start,
    wheelStart,
    { timeout: 5_000 },
  );
  expect(
    await page.evaluate(() => document.querySelectorAll("#card .cell.marked").length),
  ).toBe(0);
  await shot(page, "04-round-in-progress");

  // Tap (Space) to daub the shown number; drive any free-selection specials by
  // clicking pickable squares; keep going until the round resolves.
  const chipsBefore = Number(await page.locator("#chips").textContent());
  for (let i = 0; i < 400; i++) {
    const resolved = await page.evaluate(() =>
      /Payout|No win|BINGO/.test(document.getElementById("message").textContent),
    );
    if (resolved) break;
    const picked = await page.evaluate(() => {
      const p = document.querySelectorAll("#card .cell.pickable");
      if (p.length) { p[0].click(); return true; }
      return false;
    });
    if (!picked) {
      const spinning = await page.evaluate(() =>
        document.getElementById("called").classList.contains("spinning"),
      );
      if (spinning) await page.keyboard.press("Space");
    }
    await page.waitForTimeout(60);
  }

  // The round resolved to a result, cells got daubed, and chips changed.
  await expect(page.locator("#message")).toContainText(/Payout|No win|BINGO/);
  expect(
    await page.evaluate(() => document.querySelectorAll("#card .cell.marked").length),
  ).toBeGreaterThanOrEqual(1);
  const chipsAfter = Number(await page.locator("#chips").textContent());
  expect(chipsAfter).not.toBe(chipsBefore);
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
