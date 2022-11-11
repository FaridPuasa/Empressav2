const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const string = {
    type: String,
}

const instockpodSchema  = new mongoose.Schema({
    product_id: {type:String, required:true, unique:true},
    sequence: string,
    productEntity: string,
    productBrand: string,
    productName: string,
    productCategory: string,
    productOther: string,
    productQuantity: string,
    productPrice: string,
    productSalePrice: string,
    productColor: {type: [String]},
    productSize: {type: [String]},
    productFlavour: {type: [String]},
    productScent: {type: [String]},
    quantity: {type: [String]},
    uid: string,
    name: string,
    dateCreated: string,
})

module.exports = mongoose.model('instocks', instockpodSchema)