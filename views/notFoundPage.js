const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (slug) => layout(html` <h1>Page Not Found: ${slug}</h1> `);
