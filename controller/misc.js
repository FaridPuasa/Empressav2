const miscDB = require('../models/misc')
const moment = require('moment')

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
            res.flash('error', `Tracking number already exist | Require fields missing`)
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
            res.redirect('/:services-in')
        }
    })
}

module.exports = {
    insertMisc,

}