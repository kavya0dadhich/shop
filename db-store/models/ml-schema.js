const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mlSchema = new Schema({
    ml:{
        type:Number,
        default:false
    },
    description:{
        type:String,
        default:false
    }
})
module.exports = mongoose.model("ml",mlSchema)