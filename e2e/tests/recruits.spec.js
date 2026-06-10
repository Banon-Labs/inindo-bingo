// Recruit-finder page smoke: the Japan map renders the recruit markers, the
// off-map special site is listed, and clicking a recruit's name opens the
// character sheet (stats, gear names, raw magic mask, recruitment state).
import { test, expect } from "@playwright/test";

const SHOTS = "artifacts/shots";

test.use({ storageState: { cookies: [], origins: [] } });

test("recruit finder map + character sheet", async ({ page }) => {
  await page.goto("/recruits.html");

  // 7 on-map recruit markers + the off-map special-site entry (Bishamon).
  await expect(page.locator("#map .recruit")).toHaveCount(7);
  await expect(page.locator("#offmap")).toContainText("Bishamon");
  await expect(page.locator("#offmap")).toContainText("Hyuga");
  await page.screenshot({ path: `${SHOTS}/10-recruit-map.png`, animations: "disabled" });

  // Click Hanzo's name label -> his sheet opens.
  await page.locator("#map .label", { hasText: "Hanzo" }).click();
  await expect(page.locator("#who")).toHaveText("Hanzo");
  await expect(page.locator("#cls")).toContainText("Fuma ninja");
  await expect(page.locator("#cls")).toContainText("Mikawa");
  const sheet = page.locator("#sheet");
  await expect(sheet).toContainText("43/43"); // HP
  await expect(sheet).toContainText("Steel Blade"); // gear as item names
  await expect(sheet).toContainText("0x0201"); // raw magic mask
  await expect(sheet).toContainText("Flame"); // identity-mapped spells (bit 0)
  await expect(sheet).toContainText("Repair"); // bit 9 — the runtime anchor
  await expect(sheet).toContainText("not recruitable at game start");
  await page.screenshot({ path: `${SHOTS}/11-hanzo-sheet.png`, animations: "disabled" });

  // Off-map recruit is clickable too.
  await page.locator("#offmap a", { hasText: "Bishamon" }).click();
  await expect(page.locator("#who")).toHaveText("Bishamon");
  await expect(page.locator("#cls")).toContainText("location name unverified");
});
