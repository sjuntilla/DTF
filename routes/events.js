const express = require("express");
const router = express.Router();
const knex = require("../database/knex.js");

c;

//for production
// router.get("/", (req, res) => {
//   res.render("event", events);
// });

//for testing
router.get("/", (req, res) => {
  res.render("event");
});
router.post("/", (req, res) => {
  console.log(req.body);
});

module.exports = router;
