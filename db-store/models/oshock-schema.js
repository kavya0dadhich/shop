const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OstockSchema = new Schema({
  category: { type: Object, default: false },
  brandName: { type: Object, default: false },
  quantity: { type: Number, default: false },
  id: {},
  status: { type: Boolean, default: true },
});
const ostock = mongoose.model("ostock", OstockSchema);
module.exports = ostock;