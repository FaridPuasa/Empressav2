const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const string = {
    type: String,
}

const agentpodSchema  = new mongoose.Schema({
    aid: {type:String, required:true, unique:true},
    agentType: string,
    agentName: string,
    contact: string,
    email: string,
    brand: string,
    model: string,
    registration: string,
    color: string,
    dateCreated: string,
})

module.exports = mongoose.model('agents', agentpodSchema)