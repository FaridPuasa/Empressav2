const mongoose = require("mongoose");
const moment = require("moment");

const reqString = {
    type: String,
}

let date = moment().format();
let later = moment(date).add(21,'d')

let entryDate = {type: Date, default: date}
let expireDate = {type: Date, default: later}

const grmySchema  = new mongoose.Schema({
    trackingNumber: {type: String, unique: true},
    parcelNumber: reqString,
    patientNumber: reqString,
    grpTrack: reqString,
    name: reqString,
    contact: reqString,
    address: reqString,
    area: reqString,
    areaIndicator: reqString,
    tag: reqString,
    product: reqString,
    value: reqString,
    reason: reqString,
    remark: reqString,
    reEntry: reqString,
    attemp: reqString,
    count: {type: Number},
    reSchedule: reqString,
    fridge: reqString,
    dateArrive: reqString,
    note: reqString,
    dateEntry: reqString,
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

grmySchema.index({createdAt: 1},{expireAfterSeconds: 31536000});//1 year
module.exports = mongoose.model('grmys', grmySchema)


