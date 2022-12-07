const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const string = {
    type: String,
}

const wellousSchema  = new mongoose.Schema({
    product_id: {type:String, required:true, unique:true},
    sequence: string,
    batch: string,
    productBrand: string,
    productName: string,
    productQuantity: string,
    productPrice: string,
    productExpiry: string,
    shelf: string,
    zone: string,
    uid: string,
    name: string,
    dateCreated: string,
    history: [{
        statusHistory: string, 
        dateUpdated: string ,
        updateBy: string, 
        updateById: string, 
    }],
    editHistory: [{
        oldArea: string, 
        oldAreaIndicator: string , 
        oldNote: string, 
        oldAddress: string, 
        oldContact: string, 
        editedBy: string, 
        editedAt: string
    }],
})

module.exports = mongoose.model('wellous', wellousSchema)