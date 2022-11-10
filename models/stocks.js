const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const string = {
    type: String,
}

const instockpodSchema  = new mongoose.Schema({
    sequence: string,
    productEntity: string,
    productName: string,
    productCategory: string,
    productOther: string,
    productQuantity: string,
    productPrice: string,
    productSalePrice: string,
    productColor: {type: [String]},
    productSize: {type: [String]},
    quantity: {type: [String]},
    uid: string,
    name: string,
    dateCreated: string,
})

module.exports = mongoose.model('instocks', instockpodSchema)