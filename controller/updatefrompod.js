const warehouseDB = require('../models/warehouseInventory')
const moment = require('moment')

const insertZaloraPod = ((req,res)=>{
    let data = req.body
    let dateEntry = moment().format("DD/MM/YYYY, h:mm:ss a")
    let date =  moment().format("DD/MM/YYYY")
    let agentName = data.agentName
    let areaCode = data.areaCode
    let record = "GR/POD/ZAL/" + agentName + "/" + date + "/" + areaCode
    let tracker = data.trackingNumC
    console.log(tracker)
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: tracker[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
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
        let option = {upsert: false, new: false}
        console.log(filter)
        warehouseDB.findOneAndUpdate(filter, update, option, (err,result) => {
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

const insertPharmacyPod = ((req,res)=>{
    let data = req.body
    let dateEntry = moment().format("DD/MM/YYYY, h:mm:ss a")
    let date =  moment().format("DD/MM/YYYY")
    let agentName = data.agentName
    let areaCode = data.areaCode
    let record = "GR/POD/PHR/" + agentName + "/" + date + "/" + areaCode
    let tracker = data.trackingNumC
    console.log(tracker)
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: tracker[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
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
        let option = {upsert: false, new: false}
        console.log(filter)
        pharmacyDB.findOneAndUpdate(filter, update, option, (err,result) => {
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

const insertFmxPod = ((req,res)=>{
    let data = req.body
    let dateEntry = moment().format("DD/MM/YYYY, h:mm:ss a")
    let date =  moment().format("DD/MM/YYYY")
    let agentName = data.agentName
    let areaCode = data.areaCode
    let record = "GR/POD/FMX/" + agentName + "/" + date + "/" + areaCode
    let tracker = data.trackingNumC
    console.log(tracker)
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: tracker[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
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
        let option = {upsert: false, new: false}
        console.log(filter)
        fmxDB.findOneAndUpdate(filter, update, option, (err,result) => {
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

const insertGrpPod = ((req,res)=>{
    let data = req.body
    let dateEntry = moment().format("DD/MM/YYYY, h:mm:ss a")
    let date =  moment().format("DD/MM/YYYY")
    let agentName = data.agentName
    let areaCode = data.areaCode
    let record = "GR/POD/GRP/" + agentName + "/" + date + "/" + areaCode
    let tracker = data.trackingNumC
    console.log(tracker)
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: tracker[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
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
        let option = {upsert: false, new: false}
        console.log(filter)
        grpDB.findOneAndUpdate(filter, update, option, (err,result) => {
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

const insertRunnerPod = ((req,res)=>{
    let data = req.body
    let dateEntry = moment().format("DD/MM/YYYY, h:mm:ss a")
    let date =  moment().format("DD/MM/YYYY")
    let agentName = data.agentName
    let areaCode = data.areaCode
    let record = "GR/POD/RUN/" + agentName + "/" + date + "/" + areaCode
    let tracker = data.trackingNumC
    console.log(tracker)
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: tracker[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
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
        let option = {upsert: false, new: false}
        console.log(filter)
        runnerDB.findOneAndUpdate(filter, update, option, (err,result) => {
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

const insertPersonalPod = ((req,res)=>{
    let data = req.body
    let dateEntry = moment().format("DD/MM/YYYY, h:mm:ss a")
    let date =  moment().format("DD/MM/YYYY")
    let agentName = data.agentName
    let areaCode = data.areaCode
    let record = "GR/POD/PLS/" + agentName + "/" + date + "/" + areaCode
    let tracker = data.trackingNumC
    console.log(tracker)
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: tracker[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
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
        let option = {upsert: false, new: false}
        console.log(filter)
        personalDB.findOneAndUpdate(filter, update, option, (err,result) => {
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

const insertBmfPod = ((req,res)=>{
    let data = req.body
    let dateEntry = moment().format("DD/MM/YYYY, h:mm:ss a")
    let date =  moment().format("DD/MM/YYYY")
    let agentName = data.agentName
    let areaCode = data.areaCode
    let record = "GR/POD/BMF/" + agentName + "/" + date + "/" + areaCode
    let tracker = data.trackingNumC
    console.log(tracker)
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: tracker[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
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
        let option = {upsert: false, new: false}
        console.log(filter)
        grpDB.findOneAndUpdate(filter, update, option, (err,result) => {
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

const insertRO = ((req,res)=>{
    let data = req.body
    let dateEntry = moment().format("DD/MM/YYYY, h:mm:ss a")
    let date =  moment().format("DD/MM/YYYY")
    let record = "GR/BMF/RO/" + data.record
    let ro = new roDB ({
        date: date,
        location: data.location,
        madeBy: data.madeBy,
        agentName: data.agentName,
        record: record,
        numbers: data.numbering,
        productBrand: data.productBrand,
        productName: data.productName,
        productType: data.ProductType,
        poductQuantity: data.productQuantity,
    })
})

module.exports = {
    insertZaloraPod,
    insertBmfPod,
    insertFmxPod,
    insertGrpPod,
    insertRunnerPod,
    insertPharmacyPod,
    insertRunnerPod,
    insertPersonalPod
}

if(checkbox == true){
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: tracker[i]}
        let update = {
            status: "DELIVERY IN PROGRESS", //need to find a way to change to delivery in progress
            $push: {
                history: {
                    statusDetail: "DELIVERY IN PROGRESS", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                    updateByPos: data.userPos 
                }
            }
        }
        let option = {upsert: false, new: false}
        console.log(filter)
        warehouseDB.findOneAndUpdate(filter, update, option, (err,result) => {
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
}
else{
    console.log("failed to update")
}