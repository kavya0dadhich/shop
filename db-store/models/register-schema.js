const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
  firstName: {
    type: String,
    default: false,
  },
  lastName: {
    type: String,
    default: false,
  },
  address: {
    type: String,
    default: false,
  },
  phoneNumber: {
    type: Number,
    default: false,
  },
  email: {
    type: String,
    default: false,
  },
  DOB: {
    type: String,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    default: false,
  },
});
module.exports = mongoose.model("register", registerSchema);
