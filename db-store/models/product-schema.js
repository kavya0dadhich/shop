const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  invoice: {
    type: String,
    default: false,
  },
  category: {
    type: Object,
    default: false,
  },
  brandName: {
    type: Object,
    default: false,
  },
  quantity: {
    type: Number,
    default: false,
  },
  // dueQuantity: {
  //   type: Number,
  //   default: false,
  // },
  address: {
    type: String,
    default: false,
  },
  // ml: {
  //   type: Object,
  //   default: false,
  // },
  date: {
    type: String,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  id:{},
});
module.exports = mongoose.model("Products", ProductSchema);
