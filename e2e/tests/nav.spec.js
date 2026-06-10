// Shared site-family navigation: every page carries the same four-entry nav
// strip (bingo demo, casino map, recruit finder, Inindo Atlas), with the
// current page highlighted via aria-current. The atlas entry points at the
// sibling GitHub Pages site (banon-labs.github.io/inindo-atlas).
import { test, expect } from "@playwright/test";

const ATLAS_URL = "https://banon-labs.github.io/inindo-atlas/";
const ENTRIES = [
  { href: "index.html", label: /bingo/i },
  { href: "map.html", label: /casino map/i },
  { href: "recruits.html", label: /recruit/i },
  { href: ATLAS_URL, label: /atlas/i },
];

for (const path of ["/index.html", "/map.html", "/recruits.html"]) {
  test(`site nav on ${path}`, async ({ page }) => {
    await page.goto(path);
    const nav = page.locator("nav.sitenav");
    await expect(nav).toBeVisible();
    for (const e of ENTRIES) {
      const link = nav.locator(`a[href="${e.href}"]`);
      await expect(link).toBeVisible();
      await expect(link).toContainText(e.label);
    }
    // the entry for the page we are on is marked as current
    const current = nav.locator('a[aria-current="page"]');
    await expect(current).toHaveAttribute("href", path.slice(1));
  });
}
