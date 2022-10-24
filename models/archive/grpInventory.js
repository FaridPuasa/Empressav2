const mongoose = require("mongoose");
const moment = require("moment");

const reqString = {
    type: String,
}

let date = moment().format();
let later = moment(date).add(21,'d')

let entryDate = {type: Date, default: date}
let expireDate = {type: Date, default: later}

const grpSchema  = new mongoose.Schema({
    trackingNumber: {type: String, unique: true},
    name: reqString,
    contact: reqString,
    address: reqString,
    area: reqString,
    areaIndicator: reqString,
    product: reqString,
    value: reqString,
    reason: reqString,
    remark: reqString,
    dateArriveMY: reqString,
    dateScheduleMY: reqString,
    dateArrive: reqString,
    dateSchedule: reqString,
    note: reqString,
    entryDate: entryDate,
    expireDate:expireDate,
    status: reqString,
    task: reqString,
    userName: reqString,
    userID: reqString,
    userPos: reqString,
    history: [{statusDetail: reqString, dateUpdated: reqString ,updateBy: reqString, updateById: reqString, updateByPos: reqString}],
    editHistory: [{oldArea: reqString, oldAreaIndicator: reqString , oldNote: reqString, oldAddress: reqString, oldContact: reqString, editedBy: reqString, editedAt: reqString}],
}, {timestamps: true})

grpSchema.index({createdAt: 1},{expireAfterSeconds: 31536000});//1 year
module.exports = mongoose.model('grps', grpSchema)


