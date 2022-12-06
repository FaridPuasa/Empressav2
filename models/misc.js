const mongoose = require("mongoose");
const moment = require("moment");

const string = {
    type: String,
}

let date = moment().format();
let expireDate = moment(date).add(15,'d')

let entryDate = {type: Date, default: date}
let misc = {type: Date, default: expireDate}

const miscSchema  = new mongoose.Schema({
    //Main
    trackingNumber: {type: String, unique: true},
    contactName: string,
    contactNumber: string,
    unit: string,
    jalan: string,
    kampong: string,
    simpang: string,
    postal: string,
    entity: string,
    shelfCode: string,
    value: string,
    handler: string,
    remark: string,
    currentStatus: string,
    //Date
    entryDate: entryDate,
    dateEntry: string,
    expire: misc,
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
        statusHistory: string, 
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
module.exports = mongoose.model('miscs', miscSchema)


