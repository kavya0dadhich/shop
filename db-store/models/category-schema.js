const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const SubCategorySchema = new Schema({
//     name: { type: String, required: true },
//     description: { type: String }
// });

const CategorySchema = new Schema({
    categoryName: { type: String, required: true },
    description: { type: String },
},
);

const Category = mongoose.model('Categorys', CategorySchema);

module.exports = Category;