const KeyGen = (() => {
    const FORMATS = new Set(['hex', 'hex-upper', 'base64url', 'uuid']);
    const LENGTHS = new Set([16, 32, 48, 64]);

    function randomBytes(n) {
        const buf = new Uint8Array(n);
        crypto.getRandomValues(buf);
        return buf;
    }

    function bytesToHex(bytes, upper = false) {
        const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
        return upper ? hex.toUpperCase() : hex;
    }

    function bytesToBase64Url(bytes) {
        let binary = '';
        for (const b of bytes) binary += String.fromCharCode(b);
        return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    function generateRawKey(format, byteLength) {
        const bytes = randomBytes(byteLength);

        switch (format) {
            case 'hex-upper':
                return bytesToHex(bytes, true);
            case 'base64url':
                return bytesToBase64Url(bytes);
            case 'uuid': {
                const hex = bytesToHex(bytes);
                return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
            }
            default:
                return bytesToHex(bytes);
        }
    }

    function optionsFromParams(params) {
        const format = params.get('format') || 'hex';
        const safeFormat = FORMATS.has(format) ? format : 'hex';

        const lengthRaw = Number(params.get('length') || '32');
        const byteLength = safeFormat === 'uuid'
            ? 16
            : (LENGTHS.has(lengthRaw) ? lengthRaw : 32);

        const prefix = (params.get('prefix') || '').trim();

        return { format: safeFormat, byteLength, prefix };
    }

    function generate(options) {
        const { format, byteLength, prefix } = options;
        const rawKey = generateRawKey(format, byteLength);
        const key = prefix ? prefix + rawKey : rawKey;

        return {
            key,
            rawKey,
            prefix,
            format,
            byteLength,
            entropyBits: byteLength * 8,
            generatedAt: new Date().toISOString(),
        };
    }

    function renderOutput(result, output) {
        if (output === 'json') {
            document.body.textContent = JSON.stringify({
                key: result.key,
                prefix: result.prefix || null,
                format: result.format,
                byteLength: result.byteLength,
                entropyBits: result.entropyBits,
                generatedAt: result.generatedAt,
            }, null, 2);
            return;
        }

        document.body.textContent = result.key;
    }

    return { FORMATS, LENGTHS, optionsFromParams, generate, renderOutput };
})();
