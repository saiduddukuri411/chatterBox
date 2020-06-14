const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signUp,logIn } = require("../controllers/users");

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("password").isLength({ min:6 }),
    check("retype").isLength({ min:6 }),
  ],
  signUp
);
router.post(
  "/login",[
    check("groupId").not().isEmpty(),
    check("name").not().isEmpty(),
    check("password").not().isEmpty()
  ],
  logIn
);

module.exports = router;
