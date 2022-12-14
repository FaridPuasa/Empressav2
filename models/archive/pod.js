const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const string = {
    type: String,
}

const podSchema  = new mongoose.Schema({
    podGeneralId: string,
    podSequence: string,
    madeby: string,
    deliveryArea: string,
    agentName: string,
    deliveryDate: string,
    numbers: {type: [String]},
    trackingNumber: {type: [String]},
    contactName: {type: [String]},
    contactNumber: {type: [String]},
    contactAddress: {type: [String]},
    parcelValue: {type: [String]},
    paymentMethod: {type: [String]},
    deliveryType: {type: [String]},
})

module.exports = mongoose.model('pods', podSchema)