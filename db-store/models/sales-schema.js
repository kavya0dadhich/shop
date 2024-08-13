const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    quantity:{
        type:Number,
        default:false
    },
    salesQuntity:{
        type:Number,
        default:false
    },
    typeOfSale:{
        type:String,
        default:false
    },
    productId:{
        type:String,
        default:false
    },
    shopId:{
        type:String,
        default:false
    },
    date:{
        type:String,
        default:false
    },
    updatedShopAll:{
        type:Object,
        default:false
    },
    updatedProductAll:{
        type:Object,
        default:false
    }
})
module.exports = mongoose.model("sales",salesSchema)