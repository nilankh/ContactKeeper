const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// @route GET api/auth
// @desc Get Logged in user
// @access Private
// Any time we need to protect route we simply need to bring a middleware(that is auth )and passed it as as second argument
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //q -password because main ni chahta ki password v show kre
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/auth
// @desc Auth User & get token
// @access Public
router.post(
  "/",
  [
    check("email", "Please include a valid Email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pullying out of req.body
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      // if not user
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      // If there is a user
      // now we will continue to check the password
      // bcrypt.compare return promise
      const isMatch = await bcrypt.compare(password, user.password);
      // if password not match
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      // the object we want to send in token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
