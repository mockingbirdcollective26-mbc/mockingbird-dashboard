# mockingbird-dashboard

Two standalone single-file apps. Each is plain HTML with React loaded from a CDN —
no build step, no install. Open the file in a browser, or serve the folder statically.

| File | What it is |
| --- | --- |
| `index.html` | Mockingbird Collective — marketing dashboard (content calendar, studio, affiliate and email hubs). Uses the Anthropic API for its AI tools. |
| `leg-health.html` | **Strong Legs** — a personal exercise and tracking app for lipedema, peripheral neuropathy, and knee osteoarthritis. Fully offline. |

## Strong Legs (`leg-health.html`)

A self-directed program built around three conditions at once: lipedema in the thighs,
peripheral neuropathy in the calves, feet and toes, and bilateral knee osteoarthritis.
Every exercise in it has to be safe for all three, which rules out impact, deep loaded
knee flexion, and unsupported balance work.

- **8-week program** in three phases, with a weekly schedule that never loads the knees
  two days running. Sessions are phase-aware — harder movements stay hidden until the
  program reaches them.
- **38-exercise library**, each with the reasoning, the cues, a progression and a
  regression, and what to watch for.
- **Session player** with per-exercise checkoff and a rest timer.
- **Flare mode** — when logged pain is high, the plan swaps itself to a zero-load
  Calm Day protocol automatically.
- **Symptom tracker** with charts, and **daily foot check** for neuropathy.
- **Compression center** — why custom flat-knit is indicated, a full measurement sheet
  (RAL landmarks, both limbs), a letter-of-medical-necessity draft, an appeal letter,
  and a denial-reason playbook.
- **Exportable report** for physical therapy appointments and insurance paperwork.

All data is kept in `localStorage` on the device. Nothing is uploaded anywhere, and
there is no API key to configure. Backup and restore are on the Report tab.

This is an organized self-management tool, not medical advice. It is written to be
handed to a physical therapist and argued with.

### Running locally

```sh
npx http-server .        # then open http://localhost:8080/leg-health.html
```
