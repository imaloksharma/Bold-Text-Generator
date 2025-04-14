const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const styleSelect = document.getElementById('styleSelect');

inputText.addEventListener('input', updateOutput);
styleSelect.addEventListener('change', updateOutput);

function updateOutput() {
    const text = inputText.value;
    const style = styleSelect.value;
    outputText.textContent = applyStyle(text, style);
}

function applyStyle(text, style) {
    const map = {
        bold: { offsetUpper: 0x1D400, offsetLower: 0x1D41A },
        italic: { offsetUpper: 0x1D608, offsetLower: 0x1D622 },
        boldItalic: { offsetUpper: 0x1D42C, offsetLower: 0x1D446 },
        script: { offsetUpper: 0x1D450, offsetLower: 0x1D46A },
        fraktur: { offsetUpper: 0x1D504, offsetLower: 0x1D51E },
        boldItalic: { offsetUpper: 0x1D468, offsetLower: 0x1D482 },
        script: { offsetUpper: 0x1D49C, offsetLower: 0x1D4B6 },
        fraktur: { offsetUpper: 0x1D504, offsetLower: 0x1D51E },
    };

    if (style === 'boxed') return boxText(text);

    const offsets = map[style];
    if (!offsets) return text;

    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            return String.fromCodePoint(offsets.offsetUpper + (code - 65));
        } else if (code >= 97 && code <= 122) {
            return String.fromCodePoint(offsets.offsetLower + (code - 97));
        } else {
            return char;
        }
    }).join('');
}

function boxText(text) {
    const boxed = {
        A: '🄰', B: '🄱', C: '🄲', D: '🄳', E: '🄴', F: '🄵', G: '🄶',
        H: '🄷', I: '🄸', J: '🄹', K: '🄺', L: '🄻', M: '🄼', N: '🄽',
        O: '🄾', P: '🄿', Q: '🅀', R: '🅁', S: '🅂', T: '🅃', U: '🅄',
        V: '🅅', W: '🅆', X: '🅇', Y: '🅈', Z: '🅉',
        a: '🄰', b: '🄱', c: '🄲', d: '🄳', e: '🄴', f: '🄵', g: '🄶',
        h: '🄷', i: '🄸', j: '🄹', k: '🄺', l: '🄻', m: '🄼', n: '🄽',
        o: '🄾', p: '🄿', q: '🅀', r: '🅁', s: '🅂', t: '🅃', u: '🅄',
        v: '🅅', w: '🅆', x: '🅇', y: '🅈', z: '🅉'
    };

    return text.split('').map(char => boxed[char] || char).join('');
}

function copyBoldText() {
    const text = outputText.textContent;
    navigator.clipboard.writeText(text)
        .then(() => alert('Copied to clipboard!'))
        .catch(err => alert('Failed to copy: ' + err));
}
