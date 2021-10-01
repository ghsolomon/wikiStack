const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});
const slugify = require('slugify');

const Page = db.define('page', {
  title: { type: Sequelize.STRING, allowNull: false, unique: true },
  slug: { type: Sequelize.STRING, allowNull: false, unique: true },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: { type: Sequelize.ENUM('open', 'closed') },
});

Page.addHook('beforeValidate', (page) => {
  page.slug = slugify(page.title, {
    replacement: '_', // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: 'en', // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
});

const User = db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    isEmail: true,
  },
});

Page.belongsTo(User, { as: 'author' });

module.exports = { db, Page, User };
