const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
  shopName: {
    type: String,
    default: false,
  },
  address: {
    type: String,
    default: false,
  },
  quantity: {
    type: Number,
    default: false,
  },
  dueQuntity: {
    type: Number,
    default: false,
  },
  date: {
    type: String,
    default: false,
  },
  product:{
    type:Array
  },
  status: {
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model("Shops", ShopSchema);
