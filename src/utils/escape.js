/**
 * @param {string} str
 */
const escape = (str) => {
    return str.replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/'/g, '&apos;').replace(/"/g, '&quot;');
}

module.exports = escape;