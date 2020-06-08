const Httperror = require("../models/http_error");
const httpError = require("../models/http_error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/userModel");

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new httpError("invalid details passed", 422));
  }
  const { name, password, retype } = req.body;
  if (password != retype) {
    return next(
      new httpError(
        "make sure both password and retype are passed with same value",
        422
      )
    );
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (e) {
    return next(new HttpError("failed to take password , try again", 422));
  }
  const groupId = uuidv4();
  const user = new userModel({
    name,
    password: hashedPassword,
    groupId: groupId,
  });
  try {
    await user.save();
  } catch (err) {
    return next(
      new httpError("unable to load your data, please try again", 500)
    );
  }
  let token;
  try {
    token = jwt.sign({ groupId:groupId }, "chatter_secret_code", {
      expiresIn: "1h",
    });
  } catch (err) {
    return next(new HttpError("user cannot be created , try again", 500));
  }
  res.status(200).json({groupId:groupId,token:token});
};

module.exports = { signUp };
