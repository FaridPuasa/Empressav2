const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const string = {
    type: String,
}

const mohpodSchema  = new mongoose.Schema({
    pod_id: {type:String, required:true, unique:true},
    podsequence: string,
    madeby: string,
    deliveryArea: string,
    agentName: string,
    did: string,
    deliveryDate: string,
    podstatus: string,
    acknowledge: string,
    numbers: {type: [String]},
    trackingNumber: {type: [String]},
    fridge: {type: [String]},
    contactName: {type: [String]},
    contactNumber: {type: [String]},
    contactAddress: {type: [String]},
    parcelValue: {type: [String]},
    financeNotes: {type: [String]},
    PaymentMethod: {type: [String]},
    deliveryType: {type: [String]},
})

module.exports = mongoose.model('moh_pods', mohpodSchema)