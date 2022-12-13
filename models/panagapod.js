const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const string = {
    type: String,
}

const panagapodSchema  = new mongoose.Schema({
    pod_id: {type:String, required:true, unique:true},
    podSequence: string,
    madeby: string,
    deliveryArea: string,
    agentName: string,
    did: string,
    deliveryDate: string,
    podstatus: string,
    numbers: {type: [String]},
    trackingNumber: {type: [String]},
    fridge: {type: [Boolean]},
    contactName: {type: [String]},
    contactNumber: {type: [String]},
    contactAddress: {type: [String]},
    parcelValue: {type: [String]},
    paymentMethod: {type: [String]},
    deliveryType: {type: [String]},
})

module.exports = mongoose.model('panaga_pods', panagapodSchema)