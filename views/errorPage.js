const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (error) =>
  layout(html`<h1>Page Not Found: ${error.status} : ${error.message}</h1>`);
