// Scheduling-simulator lever e2e: the lever renders, a step produces the
// labeled per-ally output, the hero-level idle flip carries its
// "decoded, awaiting runtime witness" tag, and the unsupported pass
// horizon surfaces as an explicit "simulation stopped" line.
//
// Fixture facts (pinned by the Rust suite, scheduling_sim_tests.rs):
// - boot seed 0063D76A, hero level 1, pass 1: completes, Hanzo busy.
// - seed 0000000C, hero level 99, pass 1: Hanzo flips to standing idle
//   (via the decoded-but-unwitnessed fn_BC9C gate).
// - pass 2 always stops at recruit.pass-class-handlers-c6ff-c73d-c7dc
//   (seed-independent), after covering Bishamon.
import { test, expect } from "@playwright/test";

const SHOTS = "artifacts/shots";

test.use({ storageState: { cookies: [], origins: [] } });

test("scheduling simulator lever", async ({ page }) => {
  await page.goto("/recruits.html");

  // The lever renders with its real-parameter controls and honesty copy.
  const sim = page.locator("#sim");
  await expect(sim).toContainText("Scheduling simulator");
  await expect(page.locator("#sim-seed")).toHaveValue("0063D76A");
  await expect(page.locator("#sim-hero")).toHaveValue("1");
  await expect(sim).toContainText("story beats");
  await expect(sim).toContainText("Only Hanzo can flip");
  // The pass lever is capped at 2 and says why.
  await expect(page.locator("#sim-passes option")).toHaveCount(3);
  await expect(sim).toContainText("Why at most 2 passes?");

  // Boot seed, hero level 1 (the oracle envelope), 1 pass.
  await page.locator("#sim-run").click();
  const out = page.locator("#sim-out");
  await expect(out).toContainText("Start state (new game)");
  await expect(out).toContainText("Pass 1");
  await expect(out).toContainText("25 characters processed");
  // Per-ally labeled output with the in-game check addresses.
  await expect(out).toContainText("Hanzo");
  await expect(out).toContainText("$7E:F233 / $7E:F222"); // Hanzo order/trust check addresses
  await expect(out).toContainText("busy");
  await page.screenshot({ path: `${SHOTS}/13-sim-pass1.png`, animations: "disabled", fullPage: true });

  // Hero-level lever: seed 0000000C at level 99 flips Hanzo idle, and the
  // prediction is labeled as decoded-but-unwitnessed.
  await page.locator("#sim-seed").fill("0000000C");
  await page.locator("#sim-hero").fill("99");
  await page.locator("#sim-run").click();
  await expect(out).toContainText("standing idle — recruitable");
  await expect(out).toContainText("YES");
  await expect(out).toContainText("decoded, awaiting runtime witness");
  await page.screenshot({ path: `${SHOTS}/14-sim-idle-flip.png`, animations: "disabled", fullPage: true });

  // The unsupported horizon: pass 2 stops with the named open target
  // instead of silently wrong numbers.
  await page.locator("#sim-seed").fill("0063D76A");
  await page.locator("#sim-hero").fill("1");
  await page.locator("#sim-passes").selectOption("2");
  await page.locator("#sim-run").click();
  await expect(out).toContainText("Pass 2 — partial");
  await expect(out).toContainText("simulation stopped:");
  await expect(out).toContainText("recruit.pass-class-handlers-c6ff-c73d-c7dc");
  await expect(out).toContainText("not reached");
  await page.screenshot({ path: `${SHOTS}/15-sim-stop.png`, animations: "disabled", fullPage: true });
});
