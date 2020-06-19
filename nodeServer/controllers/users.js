
const httpError = require("../models/http_error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/userModel");
const { isValidObjectId } = require("mongoose");
const {checkUserByRoom}=require('./chats');

const logIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new httpError("invalid input details, Cannot log you in", 422));
  }
  const { groupId, name, password } = req.body;
  let existingGroup;
  try {
    existingGroup = await userModel.findOne({ groupId: groupId });
  } catch (err) {
    return next(new httpError("Logging failed, try again", 500));
  }
  if (!existingGroup) {
    return next(new httpError("groupId does not exist,Please create one", 401));
  }
  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, existingGroup.password);
  } catch (err) {
    return next(new httpError("Something went wrong, try again", 500));
  }
  if (!isValidPassword) {
    return next(new httpError("invalid groupId and password passed", 500));
  }
  
  if(checkUserByRoom(groupId,name)){
    console.log('checkmarked entered')
    return next(new httpError("screen name already exists in room, pick other name", 401))
  }
  

  let token;
  try {
    token = jwt.sign(
      { groupId: existingGroup.groupId },
      process.env.JWT_KEY,
      {
        expiresIn:new Date(existingGroup.removesBy).getTime() - new Date().getTime(),
      }
    );
  } catch (err) {
    console.log(err)
    return next(new httpError("Something went wrong, Please try again", 500));
  }
  res.status(200).json({
    expiresin:existingGroup.removesBy,
    token:token
  });
};

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new httpError("Empty inputs passed, Cannot sign you in", 422));
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
    return next(new httpError("failed to take password , try again", 422));
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
    token = jwt.sign({ groupId: groupId }, process.env.JWT_KEY, {
      expiresIn: "4h",
    });
  } catch (err) {
    return next(new httpError("user cannot be created , try again", 500));
  }
  res.status(200).json({ groupId: groupId, token: token });
};

module.exports = { signUp, logIn };
