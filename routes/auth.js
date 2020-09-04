const express = require("express");
const router = express.Router();

// @route GET api/auth
// @desc Get Logged in user
// @access Private
router.get("/", (req, res) => {
  res.send("Get logged in user");
});

// @route POST api/auth
// @desc Auth User & get token
// @access Public
router.post("/", (req, res) => {
  res.send("Log In user");
});

module.exports = router;
