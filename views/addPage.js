const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () =>
  layout(html`
    <h3>Add a Page</h3>
    <hr />
    <form method="POST" action="/wiki/">
      <div>
        <label for="authorName" class="col-sm-2 control-label"
          >Author Name</label
        >
        <div class="col-sm-10">
          <input id="authorName" name="name" type="text" class="form-control" />
        </div>
      </div>

      <div>
        <label for="authorEmail" class="col-sm-2 control-label"
          >Author Email</label
        >
        <div class="col-sm-10">
          <input
            id="authorEmail"
            name="email"
            type="text"
            class="form-control"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="title" class="col-sm-2 control-label">Page Title</label>
        <div class="col-sm-10">
          <input id="title" name="title" type="text" class="form-control" />
        </div>
      </div>

      <div>
        <label for="content" class="col-sm-2 control-label">Content</label>
        <div class="col-sm-10">
          <textarea id="content" name="content" class="form-control"></textarea>
        </div>
      </div>

      <div>
        <div class="col-sm-10">
          <input
            id="open"
            name="status"
            type="radio"
            class="form-control"
            value="open"
          />
          <label for="open" class="col-sm-2 control-label">open</label>
        </div>
        <div class="col-sm-10">
          <input
            id="closed"
            name="status"
            type="radio"
            class="form-control"
            value="closed"
          />
          <label for="closed" class="col-sm-2 control-label">closed</label>
        </div>
      </div>

      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
      </div>
    </form>
  `);
