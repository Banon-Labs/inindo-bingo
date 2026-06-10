# End-to-end demo (Playwright)

Drives the live site through its full feature set and records a video plus
ordered screenshots — used to produce the showcase in the top-level README.

The single spec (`tests/demo.spec.js`) walks:

1. Arrive with gold, zero chips.
2. **Dev mode** — lock the RNG seed so the round is deterministic.
3. Buy chips with gold at the counter.
4. Wager, and watch the round auto-play (called numbers mark the card).
5. Drive any player-selection specials, then resolve to a payout.
6. The casino map of Japan.
7. Mikawa's high-stakes door rejecting a 50-gold player.
8. The same door welcoming a wealthy player.

## Run it

```bash
npm install            # @playwright/test (browsers are downloaded on demand)
npx playwright install chromium   # first time only
npm run demo           # headless; writes artifacts/
```

The config serves the parent directory (the static site) over HTTP so the
ES-module + WebAssembly loading works. Outputs land in `artifacts/`:

- `artifacts/shots/NN-*.png` — one screenshot per feature
- `artifacts/trace/.../video.webm` — full-run video

The demo is deterministic because step 2 locks the seed; re-running produces
the same round.
