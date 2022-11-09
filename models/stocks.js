const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const string = {
    type: String,
}

const instockpodSchema  = new mongoose.Schema({
    productBrand: string,
    productName: string,
    productDescription: string,
    productEntity: string,
    productCategory: string,
    productQuantity: string,
    productPrice: string,
    productSalePrice: string,
    productVarietyType: string,
    productVariety: {type: [String]},
    productVarietyQuantity: {type: [String]},
    uid: string,
    name: string,
    dateCreated: string,
})

module.exports = mongoose.model('instocks', instockpodSchema)