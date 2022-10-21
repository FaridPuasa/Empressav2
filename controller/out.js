const zaloraDB = require('../models/zaloras')
const pharmacyDB = require('../models/pharmacies')
const grpDB = require('../models/grps')
const runnerDB = require('../models/runners')
const personalDB = require('../models/personals')
const miscDB = require('../models/miscs')
const fmxDB = require('../models/fmxs')
const stockDB = require('../models/stocks')
const moment = require('moment')

const zaloraOut = ((req,res)=> {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let status = {status: data.status}
    let statusParcel = "DELIVERY IN PROGRESS"
    let tracker = {trackingNumber: data.trackingNum}
    let update = {
        status: statusParcel, 
        $push:{
            history: {
                statusDetail: status, 
                dateUpdated: date,
                updateBy: data.username, 
                updateById: data.userID, 
                updateByPos: data.userPos
            }
        }
    }
    let option = {upsert: false, new: false}
    zaloraDB.findOne(tracker, (err,result) => {
        let count = result.count
        //console.log(count)
        if (result){
            if(count == 0 || count <= 3) {
                let newcount = count + 1
                result.count = newcount
                result.save()
                console.log(newcount)
                //console.log(result.count)
            }
            else if (count >= 4){
                console.log("Max count reached")
                res.flash('error', `Failed to update ${tracker}. Max count reached.`)
            }
            else{
                console.log(err)
                res.flash('error', `Failed to update ${tracker}`)
            }
        }
    })
    zaloraDB.findOneAndUpdate(tracker,update,option,(err,docs) => {
        if(err){
            console.log(err)
            console.log(`${tracker} failed to be updated.`)
            res.status(400).send()
            res.flash('error', `Failed to update ${tracker}`)
        } 
        else {
            console.log('update success')
            //let date = req.body.dateSchedule
            res.status(201).send()
            res.flash('success', `${tracker} has been updated.`)
            res.render('itemout',{
                name: currentUser.name,
                icNumber: currentUser.icNumber,
                position: currentUser.position,
            })
        } 
    })
})

const pharmacyOut = ((req,res)=> {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let status = {status: data.status}
    let statusParcel = "DELIVERY IN PROGRESS"
    let tracker = {trackingNumber: data.trackingNum}
    let update = {
        status: statusParcel, 
        $push:{
            history: {
                statusDetail: status, 
                dateUpdated: date,
                updateBy: data.username, 
                updateById: data.userID, 
                updateByPos: data.userPos
            }
        }
    }
    let option = {upsert: false, new: false}
    zaloraDB.findOne(tracker, (err,result) => {
        let count = result.count
        //console.log(count)
        if (result){
            if(count == 0 || count <= 3) {
                let newcount = count + 1
                result.count = newcount
                result.save()
                console.log(newcount)
                //console.log(result.count)
            }
            else if (count >= 4){
                console.log("Max count reached")
                res.flash('error', `Failed to update ${tracker}. Max count reached.`)
            }
            else{
                console.log(err)
                res.flash('error', `Failed to update ${tracker}`)
            }
        }
    })
    zaloraDB.findOneAndUpdate(tracker,update,option,(err,docs) => {
        if(err){
            console.log(err)
            console.log(`${tracker} failed to be updated.`)
            res.status(400).send()
            res.flash('error', `Failed to update ${tracker}`)
        } 
        else {
            console.log('update success')
            //let date = req.body.dateSchedule
            res.status(201).send()
            res.flash('success', `${tracker} has been updated.`)
            res.render('itemout',{
                name: currentUser.name,
                icNumber: currentUser.icNumber,
                position: currentUser.position,
            })
        } 
    })
})