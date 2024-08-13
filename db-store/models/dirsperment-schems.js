const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dirspermentSchema = new Schema({
    productID:{
        type:String,
        default:false
    },
    shopID:{
        type:String,
        default:false
    },
    updatedProduct:{
        type:Object,
        default:false
    },
    updatedShop:{
        type:Object,
        default:false
    },
    quantity:{
        type:String,
        default:false
    },
    date:{
        type:String,
        default:false
    },
    note:{
        type:String,
        default:false
    },
})
module.exports = mongoose.model("dirsperment",dirspermentSchema)