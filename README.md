# API Key Generator

A single-file, browser-based API key generator. No build step, no dependencies — drop `index.html` into a repo and enable GitHub Pages.

Keys are generated locally using the Web Crypto API. Nothing is sent over the network.

## Default output

The default settings produce a 64-character lowercase hex string (256 bits of entropy), equivalent to:

```powershell
[guid]::NewGuid().ToString("N") + [guid]::NewGuid().ToString("N")
```

## Features

* **Single HTML file** — no dependencies or build step
* **Cryptographically secure** — uses `crypto.getRandomValues()`
* **Configurable format** — hex (lower/upper), Base64 URL-safe, or UUID v4
* **Configurable length** — 16, 32, 48, or 64 bytes (128–512 bits)
* **Optional prefix** — e.g. `sk_live_`
* **Dark mode** — follows system preference by default, with a manual toggle
* **Copy to clipboard** — with visual feedback
* **Keyboard shortcuts** — `G` generate, `C` copy, `T` toggle theme
* **Entropy display** — character count and bit strength shown for each key

## Usage

Open `index.html` in a browser, or host it with GitHub Pages.

1. Choose a format and byte length (or leave the defaults).
2. Optionally add a prefix.
3. Click **Generate New Key** or press `G`.
4. Click **Copy Key** or press `C`.

Click the key to select it for manual copying.

## GitHub Pages

1. Add `index.html` to the repository root (or `/docs` if using that folder).
2. In **Settings → Pages**, set the source branch and folder.
3. Browse to:

```
https://<username>.github.io/<repo-name>/
```

## Privacy

All key generation happens in the browser. No analytics, no external requests, no data stored.

## License

MIT
