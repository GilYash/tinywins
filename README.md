# TinyWins v3 — hosted, updateable checklist

TinyWins is a static web app (no account, API key, server, or database needed).
Each visitor's tasks and preferences stay in **their own browser** via localStorage.
All visitors use the same app code but **do not share tasks**. Task data is not synced
between browsers/devices. Clearing site data may erase it; export backups periodically.

## Publish with the connected GitHub account

For the account `GilYash`, make a **new PUBLIC repository** named `tinywins` at:
https://github.com/new (choose owner `GilYash`; initialize with a README to create main).

Once the repository exists, the connected ChatGPT GitHub integration can upload
these app files. It cannot currently create repositories or enable GitHub Pages.
Avoid reusing unrelated academic or professional repositories.

Then choose **Settings → Pages → Build and deployment → Deploy from a branch →
main → /(root) → Save**. The resulting site is
https://gilyash.github.io/tinywins/ after GitHub finishes publishing.

## Put it online with one permanent URL (GitHub Pages)

1. Create a GitHub repository, e.g. `tinywins`.
2. Upload the **contents** of this folder to the root of the repository
   (`index.html`, `sw.js`, `manifest.webmanifest`, `icons/`, etc.).
3. Go to repository **Settings → Pages → Build and deployment** and select
   **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
4. GitHub Pages will give you a URL like `https://USERNAME.github.io/tinywins/`.
   This is the link you can send anyone.

After setup, all future releases go to **this same repository at the same URL**.
You (the owner) publish the new files; **visitors don't download or replace files**.
When a newer service worker is detected, the app shows an **Update now** banner;
users can also refresh/reopen the website. Web deployment is required for this:
opening `index.html` locally will NOT enable automatic app updates.

**Each future release should increment `CACHE_VERSION` in `sw.js`** so existing
offline assets are replaced. Keep the app's origin and localStorage key unchanged
(`tinywins-checklist-v1`) so existing users retain their saved browser tasks.
Do NOT rename the repository or change the website URL if you want users' saved
browser data to remain available without re-importing.

### Alternative: Netlify (manual site deployment)
You can also upload this entire site folder to Netlify. The app has the same URL
for visitors after you publish updates; the owner redeploys updated site files.

## Import your existing TinyWins v1 / v2 tasks

Your old `file://` HTML file and the new hosted website use different browser
storage locations, so your old tasks will not migrate automatically.

1. Open the *old* TinyWins HTML on the device where your tasks exist.
2. **Settings → Export a backup** (download JSON).
3. Visit the new hosted TinyWins website; go to **Settings → Import a backup**.
4. Select the JSON file, verify tasks and categories, and keep the backup.

This preserves names, categories, icons, steps, and completed states. Old tasks
without a saved priority are treated as **Medium**, and their old schedule date
becomes the **Due date** (with no specified start date).

## Features

- Bilingual English LTR / Hebrew RTL (including mixed-direction task titles)
- Priority levels, filtering, default sorting, and color-coded priority board
- Gantt timeline: start + due dates, two-week/month windows, unscheduled backlog
- Insights dashboard: counts, category and priority charts, recent wins, upcoming due
- Local saving and JSON export/import; no sign-in or cloud sync
- Dark mode, list/task icons, color-coded lists
- Focus card, tiny steps, two-minute start timer, check-off celebration
- First-use and reopenable guided tutorial
- Offline cache/installable web app after first online visit on supported browsers

## Files

- `index.html`: complete browser app
- `sw.js`: offline caching and update checks
- `manifest.webmanifest`: installable app metadata
- `icons/`: app icons

## Privacy, limits, and updating

The website host serves only static app assets; it does not receive tasks.
A different browser, incognito window, or device starts with separate data.
Updates to the published code are shared, but user tasks remain private.
When a new version is deployed, browsers detect it on later visits/visibility
checks; the update prompt lets the user refresh safely. It is not real-time
push deployment to open tabs, and user work is not synced between devices.

## iPhone / iPad

On an iPhone, open the published website in **Safari**, tap **Share**, choose
**Add to Home Screen**, then **Add**. TinyWins has a dedicated Apple touch icon,
standalone app metadata, safe-area layout spacing, and touch-sized controls.
You can reopen these instructions in TinyWins **Settings → Add to Home Screen**.

This is a Progressive Web App (PWA), not an App Store-native iOS application.
Its browser-local task data is **not synced** with an existing desktop copy:
export a backup on one device and import it on the other if necessary.