const router = require("express").Router();
const { Page } = require("../models");
const { addPage } = require("../views");

router.get("/", (req, res, next) => {
  res.send("go to GET /wiki/");
});

router.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res) => {
  res.send(addPage());
});

module.exports = router;
