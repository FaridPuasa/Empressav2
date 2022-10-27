const express = require('express')
const flash = require('connect-flash')
//const podDB = require('../models/pod')
//const tempPodDB = require('../models/tempPod')
const moment = require('moment')

const insertPod = ((req,res) =>{
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")   
    let newDate = moment().format("DD/MM/YYYY, h:mm:ss a")
    let ref = "GR/POD/" + data.agentName + "[" + data.areaCode + "]" + "/" + date
    let tracker = data.trackingNumC
    console.log(tracker)
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: tracker[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", 
            $push: {
                history: {
                    statusDetail: "SCHEDULED FOR DELIVERY", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                    updateByPos: data.userPos 
                }
            }
        }
        let option = {upsert: true, new: true}
        console.log(filter)
        inventories.findOneAndUpdate(filter, update, option, (err,result) => {
            if(err){
                console.log(err)
                console.log(`${tracker} failed to be updated.`)
                res.status(400).send()
                res.flash('error', `Failed to save the POD.`)
                res.render('error')
            } 
            else {
                console.log(result)
                console.log(`POD has been submitted.`)
                res.status(201).send()
                res.flash('success', `POD has been submitted.`)
            }
        })
    }
    let pod = new podDB({
        podRef: ref,
        podAssign: data.agentName,
        podDate: data.dateAssign,
        podTotal: data.value,
        podProduct: data.product,
        podArea: data.areaCode,
        podCreate: data.dateCreate,
        podMade: data.madeBy,
        podAgentId: data.agentID,
        trackingNum: data.trackingNumC,
        name: data.contactNameC,
        contact: data.phoneC,
        address: data.addressC,
        value: data.valueC,
    })
   console.log(data.trackingNumC)
    pod.save((err) => {
        if (err){
            console.log(err)
            console.log(`${tracker} failed to be updated.`)
            res.status(400).send()
            res.flash('error', `Failed to update ${tracker}`)
            res.render('error')
        }
        else{
            console.log(`${tracker} has been updated.`)
            res.status(201).send()
            res.flash('success', `${tracker} has been updated.`)
            res.render ('success', {
                head: "Task Assigned",
                message: "Task successfully assigned to <%=  data.assignTo %>.",
            })
        }
    })
})

const insertOnePod = ((req,res) => {
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")   
    let newDate = moment().format("DD/MM/YYYY, h:mm:ss a")
    let ref = "GR/POD/" + data.agentName + "[" + data.areaCode + "]" + "/" + date
    let tracker = data.trackingNumC
    inventories.findOneAndUpdate(filter, update, option, (err,docs) => {
        if(err){
            console.log(err)
            res.flash('error', `Failed to update ${tracker}`)
            alert(`Failed to update ${tracker}`)
        } 
        else {
            res.flash('success', `${tracker} has been updated.`)
            console.log('update success')
        }
    })
    let pod = new podDB({
        podRef: ref,
        podAssign: data.agentName,
        podDate: data.dateAssign,
        podTotal: data.value,
        podProduct: data.product,
        podArea: data.areaCode,
        podCreate: data.dateCreate,
        podMade: data.madeBy,
        podAgentId: data.agentID,
        trackingNum: data.trackingNumC,
        name: data.contactNameC,
        contact: data.phoneC,
        address: data.addressC,
        value: data.valueC,
    })
   console.log(data.trackingNumC)
    pod.save((err) => {
        if (err){
            console.log(err)
            console.log(`${tracker} failed to be updated.`)
            res.status(400).send()
            res.flash('error', `Failed to update ${tracker}`)
            res.render('error')
        }else {
            console.log(`${tracker} has been updated.`)
            res.status(201).send()
            res.flash('success', `${tracker} has been updated.`)
            res.render ('success', {
                head: "Task Assigned",
                message: "Task successfully assigned to <%=  data.assignTo %>.",
            })
        }
    })
})

const readPod = ((req,res) => {
    podDB.find(filter, (err,result) => {
        res.render('podlist', {
            title: "POD LIST",
            podlist: result,
        })
    })
})

// listing
const insertTempPod = ((req,res) => {
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")   
    let newDate = moment().format("DD/MM/YYYY, h:mm:ss a")
    let tracker = data.trackingNumC
    inventories.findOneAndUpdate(filter, update, option, (err,docs) => {
        if(err){
            console.log(err)
            alert(`Failed to update ${tracker}`)
        } 
        else {
            alert('Tracking number successfully updated.')
            console.log('update success')
        }
    })
    let tempPod = new tempPodDB ({
        trackingNum: data.trackingNumber,
        name: data.name,
        contact: data.contact,
        address: data.address,
        value: data.value,
        area: data.area,
        areaIndicator: data.areaIndicator,
        product: data.product,
    })
    tempPod.save((err,docs) => {
        if (err) {
            console.log(err)
            res.flash('error', `POD already Exist | Require fields missing`)
        }
        else{
            console.log(docs)
            res.flash('error', `POD already Exist | Require fields missing`)
            //flash
        }
    })
})

const insertPodByList = ((req,res) => {
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")   
    let newDate = moment().format("DD/MM/YYYY, h:mm:ss a")
    let ref = "GR/POD/" + data.agentName + "[" + data.areaCode + "]" + "/" + date
    let tracker = data.trackingNumC
    console.log(tracker)
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: tracker[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY" + " at " + data.dateAssign, 
            $push: {
                history: {
                    statusDetail: "SCHEDULED FOR DELIVERY" + data.dateAssign, 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                    updateByPos: data.userPos 
                }
            }
        }
        let option = {upsert: true, new: true}
        console.log(filter)
        inventories.findOneAndUpdate(filter, update, option, (err,docs) => {
            if(err){
                console.log(err)
                res.render('error')
            } 
            else {
                alert('Tracking number successfully updated.')
                console.log('update success')
            }
        })
    }
    let podByList = new podDB({
        podRef: ref,
        podAssign: data.agentName,
        podDate: data.dateAssign,
        podTotal: data.value,
        podProduct: data.product,
        podArea: data.areaCode,
        podCreate: data.dateCreate,
        podMade: data.madeBy,
        podAgentId: data.agentID,
        trackingNum: data.trackingNumC,
        name: data.contactNameC,
        contact: data.phoneC,
        address: data.addressC,
        value: data.valueC,
    })
   console.log(data.trackingNumC)
   podByList.save((err) => {
        if (err){
            console.log(err)
            res.render('error')
            res.flash('error', `POD already Exist | Require fields missing`)
        }else {
            res.render ('success', {
                head: "Task Assigned",
                message: `Task successfully assigned to <%=  data.assignTo %>.`,
            })
        }
    })
})

module.exports = {
    insertPod,
    insertOnePod,
    insertTempPod,
    insertPodByList,
    readPod,
}