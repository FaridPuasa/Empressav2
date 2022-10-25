const mongoose = require("mongoose");
const moment = require("moment");

const reqString = {
    type: String,
}

let date = moment().format("DD/MM/YYYY, h:mm:ss a")
let days = moment().format();
//let later = moment(days).add(60,'d')

let entryDate = {type: Date, default: date}
let expireDate = {type: Date, default: later}

const instockSchema  = new mongoose.Schema({
    productBrand: reqString,
    productName: reqString,
    productDescription: reqString,
    productEntity: reqString,
    productCategory: reqString,
    productQuantity: reqString,
    productPrice: reqString,
    productSalePrice: reqString,
    productVarietyType: reqString,
    productVariety: reqString,
    productVarietyQuantity: reqString,
    createdBy: reqString,
    dateCreated: dateEntry,
    history: [{
        productPrice: reqString, 
        productSalePrice: reqString, 
        productQuantity: reqString, 
        productVarietyQuantity: reqString, 
        productVariety: reqString, 
        dateUpdated: reqString,
        updateBy: reqString, 
        updateById: reqString
    }],
    editHistory: [{
        oldProductPrice: reqString, 
        oldProductSalePrice: reqString, 
        oldProductQuantity: reqString, 
        oldProductVarietyQuantity: reqString, 
        oldProductVariety: reqString, 
        editedBy: reqString, 
        editedAt: reqString
    }],
}, {timestamps: true})

//inventorySchema.index({createdAt: 1},{expireAfterSeconds: 31536000});//1 year
module.exports = mongoose.model('instocks', instockSchema)