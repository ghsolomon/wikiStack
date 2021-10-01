const router = require("express").Router();
const { Page, User } = require("../models");
const { editPage, main, wikiPage, addPage } = require("../views");

router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });
    const [user] = await User.findOrCreate({
      where: { name: req.body.name, email: req.body.email },
    });
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res) => {
  res.send(addPage());
});

router.get("/:slug/edit", async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    const author = await page.getAuthor();
    res.send(editPage(page, author));
  } catch (error) {
    next(error);
  }
});

router.put("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    await page.update({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });
    res.redirect(`/wiki/${req.params.slug}`);
  } catch (error) {
    next(error);
  }
});

router.delete("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    await page.destroy();
    res.redirect(`/wiki/`);
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    if (!page) {
      // res.status(404).send(`Page not found: ${req.params.slug}`);
      next();
    }
    const author = await page.getAuthor();
    res.send(wikiPage(page, author));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
