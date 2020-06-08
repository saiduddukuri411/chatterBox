const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signUp } = require("../controllers/users");

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("password").isLength({ min:6 }),
    check("retype").isLength({ min:6 }),
  ],
  signUp
);

module.exports = router;
