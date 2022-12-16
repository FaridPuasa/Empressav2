const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const string = {
    type: String,
}

const restockpodSchema  = new mongoose.Schema({
    restock_id: {type:String, required:true, unique:true},
    sequence: {type: Number},
    madeby: string,
    lcoation: string,
    agentName: string,
    deliveryDate: string,
    did: string,
    status: string,
    numbering: {type: [String]},
    productModel: {type: [String]},
    productName: {type: [String]},
    productCategory: {type: [String]},
    restockQuantity: {type: [String]},
    restockDate: {type: [String]},
})

module.exports = mongoose.model('restocks', restockpodSchema)