# Shoot Order — self-hosted

The same tool you've been using, but as an ordinary web page instead of a Claude
artifact. That one change fixes the thing that blocked your team: **everyone signs
in with their own Google account**, so if they can see the shoot folders in Drive,
they can use the tool. Nothing to grant, nothing to connect.

There is no server and no database. Approvals and notes are kept in a small file
called `shoot-order-state.json` inside your `Final/` folder, so the record travels
with the photos and anyone with Drive access can read it.

**Three files:** `index.html`, `config.js`, `README.md` (this one).

---

## Step 1 — Get a Google client ID (about 10 minutes, once)

1. Go to <https://console.cloud.google.com/> and sign in as **vismay@tranquebarhome.in**.
2. Top-left project dropdown → **New Project**. Name it `Shoot Order`. Create, then
   make sure it's the selected project.
3. In the search bar type **Google Drive API** → open it → **Enable**.
4. Left menu → **APIs & Services → OAuth consent screen**.
   - User type: **Internal** if it's offered. That's the simplest — no Google review,
     and only your Workspace accounts can sign in.
   - If **Internal** is greyed out (it will be if some of your team use Gmail
     addresses like `katakohomes@gmail.com`), choose **External** instead, and after
     filling in the app name and your email, add each person's Google address under
     **Test users**. External + test users needs no Google review either.
   - App name: `Shoot Order`. Support email and developer email: your address.
   - Scopes: you can skip the scopes screen; the app asks at sign-in time.
5. Left menu → **Credentials** → **Create credentials** → **OAuth client ID**.
   - Application type: **Web application**
   - Name: `Shoot Order web`
   - Under **Authorised JavaScript origins**, click *Add URI* and paste the address
     your site will live at — you'll get this in Step 2. If you want to do Step 2
     first, that's fine; come back here afterwards.
     - For Netlify it looks like `https://shoot-order-abc123.netlify.app`
     - No trailing slash. `http://localhost:8000` is handy to add as well if you
       ever want to run it on your own machine.
   - You do **not** need a redirect URI.
6. Click **Create**. Copy the **Client ID** — the long string ending in
   `.apps.googleusercontent.com`.
7. Open `config.js`, replace `PASTE_YOUR_GOOGLE_CLIENT_ID_HERE` with it, and save.

### Optional but recommended — API key, for the one-click folder picker

The app has a **"Choose shoot folder…"** button so you never have to copy a
folder ID out of a Drive URL. To make that button work reliably:

1. Still in **Credentials**, click **Create credentials → API key**.
2. Click into the new key → **Restrict key**.
3. Under **API restrictions**, choose **Restrict key** and tick
   **Google Picker API** (enable it first if it's not in the list, the same
   way you enabled Drive API) and **Google Drive API**.
4. Under **Application restrictions**, choose **Websites** and add the same
   address(es) as your Authorised JavaScript origins — including
   `http://localhost:PORT` if you're running it locally.
5. Copy the key and paste it into `config.js` as `apiKey`.

Skip this and the picker still tries to open, but Google may refuse it
depending on your project's defaults — if "Choose folder…" doesn't do
anything, this is the first thing to check.

---

## Step 2 — Put the files online (about 5 minutes)

Pick whichever you prefer. All are free.

### Netlify Drop — easiest, no account needed to try

1. Go to <https://app.netlify.com/drop>
2. Drag the whole folder (the one holding `index.html` and `config.js`) onto the page.
3. It gives you an address immediately, e.g. `https://sparkly-moon-123abc.netlify.app`.
4. Put that address into the **Authorised JavaScript origins** box from Step 1.5 and
   save in Google Cloud.
5. Open the address. Sign in. Done.

Sign up for a free Netlify account afterwards if you want to keep the address and
give it a nicer name (Site settings → Change site name).

### Vercel

1. <https://vercel.com/new> → import or drag the folder.
2. Take the address it gives you and add it to Authorised JavaScript origins.

### GitHub Pages

1. Make a repository, add the three files, push.
2. Settings → Pages → Source: your main branch, root folder.
3. Your address will be `https://<your-username>.github.io/<repo-name>` — add that to
   Authorised JavaScript origins.

---

## Running it locally instead

If you just want to test it (or use it only yourself) on your own machine:

1. In Google Cloud, add `http://localhost:8000` (or whatever port you use) to
   **Authorised JavaScript origins** (Step 1.5) and, if you made an API key,
   to its **Website restrictions** too.
2. From the `shoot-order` folder, run a tiny local server — anything works:
   - `python3 -m http.server 8000`
   - or `npx serve -l 8000`
3. Open `http://localhost:8000` in your browser. Sign in, then use
   **"Choose shoot folder…"** and **"Choose Final folder…"** — one click
   each — instead of editing folder IDs into `config.js`. Your picks are
   remembered on that browser.

Opening `index.html` directly as a `file://` path won't work — Google's
sign-in requires a real `http://` or `https://` origin, which is what the
local server above gives you.

---

## Step 3 — Share it

Just send people the address. There's nothing to invite them to.

What they need:
- A Google account that can already see your Drive shoot folders
- That's it

When someone signs in, Google asks them to allow the app to work with their Drive.
That permission is theirs, for their own account, and they can withdraw it any time
at <https://myaccount.google.com/permissions>.

**Access is governed entirely by Drive.** Someone who can only view a folder can
browse and arrange but the copy step will fail for them; someone with edit access
can approve. If you want to add or remove a person, do it in Drive's own sharing —
not here.

---

## What it does

- **One-click "Choose shoot folder…" / "Choose Final folder…"** the first
  time you sign in (or any time from "📁 Change folders" in the sidebar) —
  no folder IDs to copy out of a Drive URL
- Sidebar of product folders; click through subfolders
- Drag or use the arrows to set the order
- Tag frames (Style Guide, Wash Care, and so on) — or type your own
- `✕` leaves a photo out of the approval; it stays untouched in Drive
- Notes per photo for whoever edits it
- Each photo shows its dimensions, aspect ratio and file size
- **Approve** names the shoot and copies the kept photos, renamed `a.jpg`, `b.jpg`,
  `c.Style Guide.jpg` … into `Final/<name>/` — or into a folder nested inside
  `Final/` if you pick one
- Every approval gets a folder of its own, so two shoots never mix
- Originals are only ever read and copied. Nothing is renamed, moved or deleted.

## Changing settings later

To point the app at different Drive folders, click **"📁 Change folders"** in
the sidebar and pick again — no file editing needed. That choice is per
browser (it's saved in that browser's local storage), so someone else opening
the same address for the first time picks their own.

The tag buttons still live in `config.js`, and can only be changed by editing
that file and re-uploading it the same way you did in Step 2.

## If something goes wrong

**"This copy has not been set up yet"** — `config.js` still has the placeholder in it.
Paste your client ID in and re-upload.

**"Could not load Google sign-in"** — an ad-blocker or network filter is blocking
`accounts.google.com`. Allow it, or try another browser.

**Sign-in window opens then closes, nothing happens** — the address you're visiting
isn't in **Authorised JavaScript origins**. It must match exactly: `https`, same
subdomain, no trailing slash.

**"Access blocked: app not verified"** — your consent screen is External and that
person isn't in the **Test users** list. Add them in Google Cloud.

**Folders list is empty** — that account can't see the folders in Drive. Check in
Drive directly, and share the folder with them there.

**Copying fails** — that account has view-only access to `Final/`. They need edit
access to approve.

**"Choose folder…" button does nothing, or shows an error** — usually the API
key: either it isn't set in `config.js`, or its Website restrictions don't
include the exact address you're visiting (including the port, for
`localhost`). See the API key steps in Step 1.
