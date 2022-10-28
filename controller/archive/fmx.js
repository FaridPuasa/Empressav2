const fmxDB = require('../models/fmxs')
const moment = require('moment')

const insertFmx = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let status = "IN WAREHOUSE"
    let data = req.body
    let history = {
        statusDetail: status,
        dateUpdated: date,
        updateBy: data.userName,
        updateById: data.userID,   
    }
    let fmx = new fmxDB({
        tracking: data.consignment,
        name: data.name,
        contact: data.contact,
        address: data.address,
        area: data.area,
        areaIndicator: data.areaIndicator,
        tags: data.tag,
        product: data.formMETHOD,
        value: data.value,
        reEntry: "FALSE",
        attempt: "FALSE",
        reason: data.reason,
        remark: data.remark,
        deliveryType: data.deliveryType,
        paymentMethod: data.paymentMethod,
        note: data.note,
        reSchedule: data.reSchedule,
        dateEntry: dateEntry,
        userName: data.username,
        userID: data.userID,
        count: 0,
    })
    fmx.history.push(history)
    fmx.save((err)=>{
        if (err) {
            console.log (err)
            res.flash('error', `Tracking number already exist | Require fields missing`)
        }
        else{
            console.log('Status: 201 - success entry to database')
            req.flash('success', `${data} has been added to the database.`)
            res.status(201).send()
        }
    })
})

const readFmx = ((req,res)=>{

})

const updateFmx = ((req,res)=>{

})

module.exports = {
    insertFmx,
    readFmx,
    updateFmx,
}