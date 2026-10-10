# On-Ground.ai — Call Centre App (assignment)

A rebuild of the Call Centre agent app: app shell, dashboard, planner (calls to make, incoming, recent),
calendar, and Pulse (home + channel chat), plus the Leads modal with paging.
Sample data only — there is no backend.

## Run it

```bash
cd onground-app
npm install
npm run dev        # http://localhost:5173
npm test           # 35 unit + component tests (vitest)
npm run build      # production build in dist/
```

Needs Node 18+. Open it in the latest Chrome on a laptop; it also works at phone width.

## Stack and why

| Choice | Why |
|---|---|
| **React 19 + Vite** | React is preferred; Vite gives a fast dev loop and a tiny config. |
| **react-router (HashRouter)** | Real URLs per screen (`#/plan/incoming`, `#/pulse/callcentre-team`) and the build works on any static host with no rewrite rules. |
| **recharts** | Small declarative bar charts for the 7-day views. Loaded lazily so the first paint stays fast. |
| **lucide-react** | Consistent icon set. |
| **Plain CSS** (one file, tokens at the top) | Keeps type sizes restrained and easy to tune in one place; no styling framework needed for an app this size. |
| **vitest + Testing Library** | Tests the behaviour a user sees (paging, chat, call flow), not implementation details. |

## What is done

**Must build**
- App shell: sidebar (Plan expands to its sub-pages) and top bar
- Dashboard: greeting + KPI cards, on/off queue toggle, progress, who's waiting, earnings slab bar, tasks, 7-day charts
- Plan → **Calls to make**: ranked by score, expandable rows, paging (5 per page)
- Plan → **Incoming**: missed calls ranked by expected value, total at stake
- Plan → **Recent**: calls by type/time/length; tap a call to review its summary and script adherence
- **Calendar**: month grid with event dots, Today button, month switcher, agenda for the selected day
- **Pulse** home (AvaniBot card, role/task agents, general, channels, search) and a **channel chat**
- **Leads modal** with paging (buttons, dots, ← → keys), ICP and intent scores, collapsible breakdown / journey / buying signals

**Bonus**
- Send a message in a channel (Enter or button, emoji picker, auto-scroll)
- Answer the pinned "Needs your input" card (buttons or typed reply); the answer is posted to the chat
- **Call back** and **call now**: a simulated call screen with a timer; ending the call marks the row done, adds it to Recent and updates the dashboard "Leads called" count
- **Practise a call**: pick a scenario, read the tip, record (timer), get feedback
- Works at phone width (sidebar becomes a bottom bar, grids stack)
- Charts with a library (recharts)

**Skipped on purpose**
- The DEMO strip and floating dial button (optional demo tools)
- Real audio recording / scoring in Practise (the score is a simple demo rule, see `scoreFor`)
- Real AI for AvaniBot (a few canned answers keep the demo offline)
- Persistence: state lives in memory and resets on refresh

## Project structure

```
src/
├── App.jsx                  routes
├── main.jsx                 entry (HashRouter + state provider)
├── data/                    sample data modules (user, dashboard, calls, leads, calendar, pulse, practise)
├── state/AppState.jsx       one reducer for call outcomes, chat and the needs-input card
├── utils/                   pure helpers (format, paginate, calendar grid) — all unit tested
├── components/
│   ├── layout/              AppShell, Sidebar, TopBar, CallModal
│   └── ui/                  Avatar, Modal, Collapsible, Pager, ScoreBar
├── features/
│   ├── dashboard/  plan/  calendar/  pulse/  leads/  practise/
├── styles/global.css        tokens, layout, components, responsive rules
└── test/render.jsx          test helper (router + state)
```

Design notes:
- The reducer is pure; ids and timestamps are created in the action helpers (`makeActions`), which keeps it easy to test.
- Screens read data through selectors (`selectPlanned`, `selectMissed`), so ranking logic lives in one place.
- `Modal` handles Esc, backdrop click and focus return once, and is reused by Leads, call review and AvaniBot.
- Calendar events are defined relative to today so the demo always shows dots in view.
## Data
All the sample data lives in src/data/ as small JavaScript modules:

-user.js: the signed-in user and top bar stats

-dashboard.js: KPIs, progress, earnings, tasks, who’s waiting and the 7-day chart numbers

-calls.js: planned calls, missed calls and recent calls

-leads.js: the 5 leads for the Leads modal

-calendar.js: calendar events

-pulse.js: channels, agents, chat messages and the “Needs your input” card

-practise.js: the Practise a call scenarios

## Accessibility
Buttons and links are real elements, expandable rows and collapsibles use `aria-expanded`, modals use `role="dialog"`,
the calendar is a labelled grid, and progress bars expose `role="progressbar"`.

## AI tools used
- **Claude (Anthropic)** — helped plan the structure, write the components, data and tests. I reviewed and can explain the code.

## Notes
- Built from the assignment PDF (screens, behaviours, review criteria). All code, copy and sample data here are written for this project; the mock page's source was not copied.
