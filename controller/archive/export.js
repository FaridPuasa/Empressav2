const exportDB = require('../models/export')
const moment = require('moment')

const insertExport = ((req,res) => {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let tracker = data.trackingNumber
    let filter = {trackingNumber: tracker}
    let status = "RTN TO MY"
    let option = {upsert: false, new: false}
    let update = {
        status:status,
        $push: {
            history: {
                statusDetail: status,
                dateUpdated: date, 
                updateBy: req.body.username, 
                updateById: req.body.userID, 
                updateByPos: req.body.userPos
            }
        }
    }
    inventories.findOneAndUpdate(filter,update, option, (err,docs) => {
        if(err){
            console.log(err)
            alert(`Failed to update ${tracker}`)
        } 
    })
    let exportReturn = new exportDB({
        trackingNumber: data.trackingNumber,
        newTrackingNumber: data.newTrackingNumber,
        name: data.name,
        address: data.address,
        contact: data.contact,
        dateSchedule: data.dateSchedule,
    })
    exportReturn.parcelContent.push(item)
    exportReturn.save((err) => {
        if (err){
            console.log (err)
            alert(err)
        }else {
            res.render ('success', {
                head: "Successfully save",
                message: " ",
            })
        }
    })
})

const readExport = ((req,res) => {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let tracker = data.trackingNumber
    let filter = {}
    exportDB.find(filter, (err,result) => {
        if(err){
            console.log(err)
            res.render('error', {
                error: '',
                message: ''
            })
        }
        else {
            res.render('exportlist', {
                exportlist: result,
            })
        }
    })
})

const readSearchExport = ((req,res) => {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let filter = {dateSchedule: ""}
    exportDB.find(filter, (err,result) => {
        if(err){
            console.log(err)
            res.render('error')
        }
        else{
            res.render('searchlist', {
                searchlist: result
            })
        }
    })
})

module.export = {
    insertExport,
    readExport,
}