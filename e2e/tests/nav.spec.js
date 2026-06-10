// Cross-navigation: every public page links to the Inindo Atlas (the
// browser-side map generator at banon-labs.github.io/inindo-atlas), so the
// bingo demo, casino map, recruit finder, and atlas form one connected site.
import { test, expect } from "@playwright/test";

const ATLAS_URL = "https://banon-labs.github.io/inindo-atlas/";
const PAGES = ["/index.html", "/map.html", "/recruits.html"];

for (const path of PAGES) {
  test(`atlas link in nav of ${path}`, async ({ page }) => {
    await page.goto(path);
    const link = page.locator(`a[href="${ATLAS_URL}"]`).first();
    await expect(link).toBeVisible();
    await expect(link).toContainText(/atlas/i);
  });
}
