const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const string = {
    type: String,
}

const pickuppodSchema  = new mongoose.Schema({
    pickup_id: {type:String, required:true, unique:true},
    sequence: {type: Number},
    madeby: string,
    location: string,
    agentName: string,
    did: string,
    status: string,
    numbering: {type: [String]},
    serviceType: {type: [String]},
    contactName: {type: [String]},
    contactNumber: {type: [String]},
    contactAddress: {type: [String]},
    itemValue: {type: [String]},
    pickupQuantity: {type: [String]},
    pickupDate: string,
})

module.exports = mongoose.model('pickups', pickuppodSchema)