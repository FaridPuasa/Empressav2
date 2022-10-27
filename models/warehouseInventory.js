const mongoose = require("mongoose");
const moment = require("moment");

const string = {
    type: String,
}

let date = moment().format();
let expireDateFMX = moment(date).add(16,'d')
let expireDateGRP = moment(date).add(21,'d')
let expireDateMOH = moment(date).add(7,'d')
let expireDateJPMC = moment(date).add(7,'d')
let expireDatePNG = moment(date).add(7,'d')
let expireDateGBS = moment(date).add(21,'d')
let expireDateZAL = moment(date).add(21,'d')

let entryDate = {type: Date, default: date}
let fmx = {type: Date, default: expireDateFMX}
let grp = {type: Date, default: expireDateGRP}
let moh = {type: Date, default: expireDateMOH}
let jpmc = {type: Date, default: expireDateJPMC}
let png = {type: Date, default: expireDatePNG}
let gbs = {type: Date, default: expireDateGBS}
let zal = {type: Date, default: expireDateZAL}

const inventorySchema  = new mongoose.Schema({
    //Main
    trackingNumber: {type: String, unique: true},
    contactName: string,
    contactNumber: string,
    contactAddress: string,
    patientNumber: string,
    areaCode: string,
    serviceTag: string,
    shelfCode: string,
    fridgeItem: string,
    deliveryType: string,
    paymentType: string,
    value: string,
    service: string,
    status: string,
    remark: string,
    note: string,
    currentStatus: string,
    //Date
    entryDate: entryDate,
    dateEntry: string,
    fmxExpire: fmx,
    grpExpire: grp,
    mohExpire: moh,
    jpmcExpire: jpmc,
    pngExpire: png,
    gbsExpire: gbs,
    zalExpire: zal,
    //Extra
    attempt: string,
    count: string,
    reentry: string,
    reschedule: string,
    failedReason: string,
    count: {type: Number},
    //Handler Details
    username: string,
    userid: string,
    //history
    history: [{
        statusDetail: string, 
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
}, {timestamps: true})

//inventorySchema.index({createdAt: 1},{expireAfterSeconds: 31536000});//1 year
module.exports = mongoose.model('inventories', inventorySchema)


