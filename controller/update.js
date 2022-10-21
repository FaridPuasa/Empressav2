const zaloraDB = require('../models/zaloras')
const pharmacyDB = require('../models/pharmacies')
const grpDB = require('../models/grps')
const runnerDB = require('../models/runners')
const personalDB = require('../models/personals')
const miscDB = require('../models/miscs')
const fmxDB = require('../models/fmxs')
const stockDB = require('../models/stocks')
const moment = require('moment')

const updateZalora = ((req,res) => {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let tracker = data.trackingNumber
    let filter = {trackingNumber: tracker}
    let update = {adress: data.adress, contact: data.contact,area: data.area, areaIndicator: data.areaIndicator,
        $push: {
            editHistory: {
                oldAddress: req.body.oldAddress,
                oldContact: req.body.oldContact,
                oldArea: req.body.oldArea,
                oldAreaIndicator: req.body.oldAreaIndicator,
                editedBy: req.body.username,
                editedAt: date,
            }
        }
    }
    let option = {upsert: false, new: false}
    zaloraDB.findOneAndUpdate(filter,update,option, (err,result)=>{
        if (err){
            console.log(err)
            console.log(`${tracker} failed to be updated.`)
            res.status(400).send()
            res.flash('error', `Failed to update ${tracker}`)
        }
        else{
            console.log(result)
            console.log(`${tracker} has been updated.`)
            res.status(201).send()
            res.flash('success', `${tracker} has been updated.`)
            res.end()
        }
    })
})

const updatePharmacy = ((req,res) => {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let tracker = data.trackingNumber
    let filter = {trackingNumber: tracker}
    let update = {adress: data.adress, contact: data.contact,area: data.area, areaIndicator: data.areaIndicator,
        $push: {
            editHistory: {
                oldAddress: req.body.oldAddress,
                oldContact: req.body.oldContact,
                oldArea: req.body.oldArea,
                oldAreaIndicator: req.body.oldAreaIndicator,
                editedBy: req.body.username,
                editedAt: date,
            }
        }
    }
    let option = {upsert: false, new: false}
    pharmacyDB.findOneAndUpdate(filter,update,option, (err,result)=>{
        if (err){
            console.log(err)
            console.log(`${tracker} failed to be updated.`)
            res.status(400).send()
            res.flash('error', `Failed to update ${tracker}`)
        }
        else{
            console.log(result)
            console.log(`${tracker} has been updated.`)
            res.status(201).send()
            res.flash('success', `${tracker} has been updated.`)
            res.end()
        }
    })
})

const updateGrp = ((req,res) => {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let tracker = data.trackingNumber
    let filter = {trackingNumber: tracker}
    let update = {adress: data.adress, contact: data.contact,area: data.area, areaIndicator: data.areaIndicator,
        $push: {
            editHistory: {
                oldAddress: req.body.oldAddress,
                oldContact: req.body.oldContact,
                oldArea: req.body.oldArea,
                oldAreaIndicator: req.body.oldAreaIndicator,
                editedBy: req.body.username,
                editedAt: date,
            }
        }
    }
    let option = {upsert: false, new: false}
    grpDB.findOneAndUpdate(filter,update,option, (err,result)=>{
        if (err){
            console.log(err)
            console.log(`${tracker} failed to be updated.`)
            res.status(400).send()
            res.flash('error', `Failed to update ${tracker}`)
        }
        else{
            console.log(result)
            console.log(`${tracker} has been updated.`)
            res.status(201).send()
            res.flash('success', `${tracker} has been updated.`)
            res.end()
        }
    })
})

const updateRunner = ((req,res) => {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let tracker = data.trackingNumber
    let filter = {trackingNumber: tracker}
    let update = {adress: data.adress, contact: data.contact,area: data.area, areaIndicator: data.areaIndicator,
        $push: {
            editHistory: {
                oldAddress: req.body.oldAddress,
                oldContact: req.body.oldContact,
                oldArea: req.body.oldArea,
                oldAreaIndicator: req.body.oldAreaIndicator,
                editedBy: req.body.username,
                editedAt: date,
            }
        }
    }
    let option = {upsert: false, new: false}
    runnerDB.findOneAndUpdate(filter,update,option, (err,result)=>{
        if (err){
            console.log(err)
            console.log(`${tracker} failed to be updated.`)
            res.status(400).send()
            res.flash('error', `Failed to update ${tracker}`)
        }
        else{
            console.log(result)
            console.log(`${tracker} has been updated.`)
            res.status(201).send()
            res.flash('success', `${tracker} has been updated.`)
            res.end()
        }
    })
})

const updatePersonal = ((req,res) => {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let tracker = data.trackingNumber
    let filter = {trackingNumber: tracker}
    let update = {adress: data.adress, contact: data.contact,area: data.area, areaIndicator: data.areaIndicator,
        $push: {
            editHistory: {
                oldAddress: req.body.oldAddress,
                oldContact: req.body.oldContact,
                oldArea: req.body.oldArea,
                oldAreaIndicator: req.body.oldAreaIndicator,
                editedBy: req.body.username,
                editedAt: date,
            }
        }
    }
    let option = {upsert: false, new: false}
    personalDB.findOneAndUpdate(filter,update,option, (err,result)=>{
        if (err){
            console.log(err)
            console.log(`${tracker} failed to be updated.`)
            res.status(400).send()
            res.flash('error', `Failed to update ${tracker}`)
        }
        else{
            console.log(result)
            console.log(`${tracker} has been updated.`)
            res.status(201).send()
            res.flash('success', `${tracker} has been updated.`)
            res.end()
        }
    })
})

const updateFmx = ((req,res) => {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let tracker = data.trackingNumber
    let filter = {trackingNumber: tracker}
    let update = {adress: data.adress, contact: data.contact,area: data.area, areaIndicator: data.areaIndicator,
        $push: {
            editHistory: {
                oldAddress: req.body.oldAddress,
                oldContact: req.body.oldContact,
                oldArea: req.body.oldArea,
                oldAreaIndicator: req.body.oldAreaIndicator,
                editedBy: req.body.username,
                editedAt: date,
            }
        }
    }
    let option = {upsert: false, new: false}
    fmxDB.findOneAndUpdate(filter,update,option, (err,result)=>{
        if (err){
            console.log(err)
            console.log(`${tracker} failed to be updated.`)
            res.status(400).send()
            res.flash('error', `Failed to update ${tracker}`)
        }
        else{
            console.log(result)
            console.log(`${tracker} has been updated.`)
            res.status(201).send()
            res.flash('success', `${tracker} has been updated.`)
            res.end()
        }
    })
})

module.exports = {
    updateFmx,
}