const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const totalStockSchema = new Schema({
  totalStock: { type: Object, default: false },
  dueBrandQuantity: { type: Number, default: false },
});

const totalStock = mongoose.model("totalStock", totalStockSchema);
module.exports = totalStock;
