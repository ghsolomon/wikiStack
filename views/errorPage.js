const html = require('html-template-tag');
const layout = require('./layout');

module.exports = (error) =>
  layout(html`<h1>Error ${error.status || 500}: ${error.message}</h1>
    <p>${error.stack}</p> `);
