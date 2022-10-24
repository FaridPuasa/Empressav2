const mongoose = require("mongoose");
const moment = require("moment");

const reqString = {
    type: String,
}

let date = moment().format("DD/MM/YYYY, h:mm:ss a")
let days = moment().format();
let later = moment(days).add(60,'d')

let entryDate = {type: Date, default: date}
let expireDate = {type: Date, default: later}

const zaloraSchema  = new mongoose.Schema({
    trackingNumber: {type: String, unique: true},
    name: reqString,
    contact: reqString,
    address: reqString,
    area: reqString,
    areaIndicator: reqString,
    tag: reqString,
    product: reqString,
    value: reqString,
    deliveryType: reqString,
    paymentMethod: reqString,
    reason: reqString,
    remark: reqString,
    reEntry: reqString,
    attemp: reqString,
    count: {type: Number},
    reSchedule: reqString,
    note: reqString,
    dateEntry: reqString,
    entryDate: entryDate,
    expireDate: expireDate,
    status: reqString,
    task: reqString,
    userName: reqString,
    userID: reqString,
    userPos: reqString,
    history: [{statusDetail: reqString, dateUpdated: reqString ,updateBy: reqString, updateById: reqString, updateByPos: reqString}],
    editHistory: [{oldArea: reqString, oldAreaIndicator: reqString , oldNote: reqString, oldAddress: reqString, oldContact: reqString, editedBy: reqString, editedAt: reqString}],
}, {timestamps: true})

//inventorySchema.index({createdAt: 1},{expireAfterSeconds: 31536000});//1 year
module.exports = mongoose.model('zaloras', zaloraSchema)