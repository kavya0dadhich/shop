const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        default:false
    },
    password:{
        type:String,
        default:false
    },
    role:{
        type:Array,
        default:false
    }
},{timestamps:true})
module.exports = mongoose.model("users",UserSchema)