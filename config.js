// ---------------------------------------------------------------------------
// Shoot Order — settings
//
// The only line you MUST change is clientId. Once that's in, sign in and use
// the "Choose shoot folder…" / "Choose Final folder…" buttons to connect your
// Drive folders with one click each — no need to touch rootFolderId or
// finalFolderId below at all. Whatever you pick in the app is remembered on
// that browser (localStorage), so config.js's folder IDs are only a fallback
// for a fresh browser that hasn't picked yet.
// ---------------------------------------------------------------------------

window.SHOOT_ORDER_CONFIG = {

  // Paste the OAuth client ID from Google Cloud here. It looks like:
  //   1234567890-abc123def456.apps.googleusercontent.com
  // Step 1 of the README explains how to get it.
  clientId: "PASTE_YOUR_GOOGLE_CLIENT_ID_HERE",

  // Optional, but needed for the one-click "Choose folder…" picker to open.
  // Google Cloud → APIs & Services → Credentials → Create credentials →
  // API key. Restrict it to the Google Picker API (and Drive API) and, under
  // "Application restrictions", to the address(es) you host this at —
  // including http://localhost:PORT if you run it locally. Leave it blank
  // and the picker still tries to open, but Google may block it.
  apiKey: "",

  // Optional fallback — used only the first time someone opens the app on a
  // browser that hasn't picked a folder yet. Kept here so the copy you've
  // already been using keeps pointing at the same folders; anyone (including
  // you, on a new browser) can still change it with "Choose shoot folder…".
  rootFolderId: "1jCYdQFPgxqSzDG3NSCNfE7y5UdWt7AHP",

  // Optional fallback — see rootFolderId above.
  finalFolderId: "1nUIWQIvy7BZMiwVc-4bpjydqhZSaTUwy",

  // The one-click tag buttons under each photo. Edit freely.
  labels: [
    "Style Guide",
    "Wash Care Cotton",
    "Light Blocking",
    "Back loop",
    "Front view",
    "Eyelets",
    "Lifestyle"
  ]
};
