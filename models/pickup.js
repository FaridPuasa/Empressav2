const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const string = {
    type: String,
}

const pickuppodSchema  = new mongoose.Schema({
    pickup_id: {type:String, required:true, unique:true},
    sequence: {type: Number},
    madeby: string,
    deliveryArea: string,
    agentName: string,
    deliveryDate: string,
    podstatus: string,
    numbers: {type: [String]},
    trackingNumber: {type: [String]},
    contactName: {type: [String]},
    contactNumber: {type: [String]},
    contactAddress: {type: [String]},
    parcelValue: {type: [String]},
    paymentMethod: {type: [String]},
})

module.exports = mongoose.model('pickups', pickuppodSchema)