const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String }
},{timestamps:true});

const CategorySchema = new Schema({
    categoryName: { type: String, required: true },
    description: { type: String },
    subCategories: [SubCategorySchema],
    data:{type:Date}
},{timestamps:true}
);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;