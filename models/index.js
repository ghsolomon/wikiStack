const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

const Page = db.define('page', {
  title: { type: Sequelize.STRING, allowNull: false, unique: true },
  slug: { type: Sequelize.STRING, allowNull: false, unique: true },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: { type: Sequelize.ENUM('open', 'closed') },
});

Page.beforeValidate((page) => {
  if (!page.slug) {
    page.slug = page.title.replace(/\s/g, '_').replace(/\W/g, '').toLowerCase();
  }
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

const Tag = db.define('tag', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Page.findAllByTagContaining = async function (search) {
  const pages = await this.findAll({
    include: {
      model: Tag,
      where: { name: { [Sequelize.Op.like]: `%${search}%` } },
    },
  });
  return pages;
};

Page.prototype.findSimilar = async function () {
  const tags = await this.getTags();
  let tagIds = [];
  if (tags) {
    tagIds = tags.map((tag) => tag.dataValues.id);
  }
  const pages = await Page.findAll({
    where: { id: { [Sequelize.Op.ne]: this.id } },
    include: {
      model: Tag,
      where: { id: tagIds },
    },
  });
  return pages;
};

Page.belongsTo(User, { as: 'author' });
User.hasMany(Page, { foreignKey: 'authorId' });
Page.belongsToMany(Tag, { through: 'PageTag' });
Tag.belongsToMany(Page, { through: 'PageTag' });

module.exports = { db, Page, User, Tag };
