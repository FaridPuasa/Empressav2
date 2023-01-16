const miscDB = require('../models/misc')
const moment = require('moment')

/*
    IN WAREHOUSE = A1
    IN MEDICINE ROOM = A2
    RE-ENTRY = A3
    SCHEDULE FOR DELIVERY = B
    DELIVERY IN PROGRESS = C
    SUCCESSFUL DELIVERY = D1
    SELF COLLECT = D2
    FAILED DELIVERY = D3
    CANCELLED DELIVERY = D4
    OUT FROM WAREHOUSE = D5
*/

/*
    Service code = 101
*/

const insertMisc = (req,res)=> {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let status = "A1"
    let attempt = 'false'
    let reentry = 'false'
    let reschedule = 'false'
    let startCount = 0
    let parcelStatus = {
        statusHistory: status, 
        dateUpdated: dateEntry,
        updateBy: data.username, 
        updateById: data.uid, 
    }
    let misc = new miscDB ({
        //Main
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactNumber: data.contactNumber,
        contactAddress: data.contactAddress,
        patientNumber: data.patientNumber,
        areaCode: data.areaCode,
        serviceTag: data.serviceTag,
        shelfCode: data.shelfCode,
        zone: data.zone,
        fridgeItem: data.fridgeItem,
        deliveryType: data.delvieryType,
        paymentType: data.paymentType,
        value: data.value,
        status: data.status,
        remark: data.remark,
        note: data.note,
        currentStatus: status,
        service: data.service,
        //Date
        entryDate: date,
        dateEntry: dateEntry,
        lastUpdate: dateEntry,
        //Extra
        attempt: attempt,
        reentry: reentry,
        reschedule: reschedule,
        count: startCount,
    })
    misc.history.push(parcelStatus)
    misc.save(err=>{
        if (err) {
            console.log (err)
            req.flash('error', `Tracking number already exist | Require fields missing`)
            res.render('error', {
                errorcode: 'XXX',
                response: 'Not Acceptable &#x1F62B;',
                message: 'No worries~ database detected duplication of tracking number.'
            })
        }
        else{
            console.log('Status: 201 - success entry to database')
            req.flash('success', `${data} has been added to the database.`)
            res.status(201).send()
            res.redirect('/misc-in')
        }
    })
}

const withdrawMisc = (req,res)=> {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let filter = {trackingNumber: data.trackingNumber}
    let update = {
        currentStatus: "D5",
        lastUpdate: date,
            $push: {
                history: {
                    statusDetail: "A1", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                }
            }
    }
    let option = {upsert: false, new: false}
    miscDB.findOneAndUpdate(filter,update,option, (err,docs)=>{
        if(err) {
            console.log(err)
            req.flash('error', `Failed to update.`)
            res.redirect('/misc-out')
        }
        else{
            req.flash('success', `Update successful`)
            res.redirect('/misc-out')
            console.log(docs)
            console.log("Miscellaneous item updated.")
        }
    })
}

module.exports = {
    insertMisc,
    withdrawMisc
}