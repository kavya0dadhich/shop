const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    userName:{
        type:String,
        default:false
    },
    address:{
        type:String,
        default:false
    },
    phoneNumber:{
        type:Number,
        default:false
    },
    email:{
        type:String,
        default:false
    },
    password:{
        type:String,
        default:false
    },
    gender:{
        type:String,
        default:false
    },
    DOB:{
        type:String,
        default:false
    },
    role:{
        type:String,
        default:false
    },
})
module.exports = mongoose.model("register", registerSchema);
