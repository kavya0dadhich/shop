const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  brandQuantity: { type: Number, required: true, default: 0 },
  Type: { type: String, default: null },
  status: { type: Boolean, default: true },
  id: {},
});

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

module.exports = SubCategory;
