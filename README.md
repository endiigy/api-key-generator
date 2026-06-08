# API Key Generator

A browser-based API key generator hosted on GitHub Pages. No build step — keys are generated locally using the Web Crypto API. Nothing is sent over the network.

## Default output

The default settings produce a 64-character lowercase hex string (256 bits of entropy), equivalent to:

```powershell
[guid]::NewGuid().ToString("N") + [guid]::NewGuid().ToString("N")
```

## Features

* **Cryptographically secure** — uses `crypto.getRandomValues()`
* **Configurable format** — hex (lower/upper), Base64 URL-safe, or UUID v4
* **Configurable length** — 16, 32, 48, or 64 bytes (128–512 bits)
* **Optional prefix** — e.g. `sk_live_`
* **URL parameters** — prefill the UI or return a key directly
* **Dark mode** — follows system preference by default, with a manual toggle
* **Copy to clipboard** — with visual feedback
* **Keyboard shortcuts** — `G` generate, `C` copy, `T` toggle theme

## Web UI

Open the site in a browser:

1. Choose a format and byte length (or leave the defaults).
2. Optionally add a prefix.
3. Click **Generate New Key** or press `G`.
4. Click **Copy Key** or press `C`.

Prefill via URL (opens the full UI):

```
https://keys.endiigy.com/?prefix=fp_
https://keys.endiigy.com/?prefix=sk_live_&format=hex&length=32
```

## URL API

Because GitHub Pages is static, generation runs in the browser when the page loads. These URLs are ideal for opening in a browser tab or bookmarking — plain `curl` will receive HTML, not the key (JavaScript must run).

### Plain text key (default)

```
https://keys.endiigy.com/api/?prefix=fp_
```

Returns only the key:

```
fp_a1b2c3d4e5f6...
```

### JSON

```
https://keys.endiigy.com/api/?prefix=fp_&output=json
```

```json
{
  "key": "fp_a1b2c3...",
  "prefix": "fp_",
  "format": "hex",
  "byteLength": 32,
  "entropyBits": 256,
  "generatedAt": "2026-06-08T14:00:00.000Z"
}
```

The root URL also supports `output=text` or `output=json`:

```
https://keys.endiigy.com/?prefix=fp_&output=text
https://keys.endiigy.com/?prefix=fp_&output=json
```

### Parameters

| Parameter | Values | Default |
|-----------|--------|---------|
| `prefix` | Any string (max 32 chars in UI) | *(none)* |
| `format` | `hex`, `hex-upper`, `base64url`, `uuid` | `hex` |
| `length` | `16`, `32`, `48`, `64` (bytes) | `32` |
| `output` | `text`, `json` | `text` (on `/api/` only) |

## GitHub Pages

1. Add all files to the repository root.
2. In **Settings → Pages**, set the source branch and folder.
3. Optionally configure a custom domain (e.g. `keys.endiigy.com`).

Required files:

```
index.html
key.js
api/index.html
```

## Privacy

All key generation happens in the browser. No analytics, no external requests, no data stored.

## License

MIT
