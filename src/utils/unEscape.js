/**
 * @param {string} str
 */
const unEscape = (str) => {
    return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&apos;/g, "'").replace(/&quot;/g, '"');
}

module.exports = unEscape;