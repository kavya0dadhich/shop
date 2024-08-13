const mongoose = require('mongoose');

async function Main()   {
    await mongoose.connect("mongodb://127.0.0.1:27017/Shop",console.log("Date base is running"))
}   
module.exports = Main