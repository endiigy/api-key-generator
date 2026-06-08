# API Key Generator

A simple browser-based API key generator.

Generates 64-character hexadecimal API keys equivalent to:

```powershell
[guid]::NewGuid().ToString("N") + [guid]::NewGuid().ToString("N")
```

## Features

* No dependencies
* Runs entirely in the browser
* Uses `crypto.randomUUID()`
* Generate on page load
* Generate on demand
* Copy to clipboard

## Live Demo

Enable GitHub Pages in repository settings and browse to:

```
https://<username>.github.io/api-key-generator/
```

## License

MIT
