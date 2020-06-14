const mongoose = require("mongoose");
const moment = require("moment");

const ttl = require("mongoose-ttl");
const uniqueValidator = require("mongoose-unique-validator");
const schema = mongoose.Schema;

const hourFromNow =()=> {
  return moment().add(4, "hour");
};

const userSchema = new schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    groupId: { type: String, required: true, unique: true },
    removesBy:{ type: Date, default: hourFromNow },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 14400 });

module.exports = mongoose.model("User", userSchema);
