const inventoryDB = require('../models/inventories')
const moment = require('moment')

/*
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

let mailOptions ={
    from: '', //Email from,
    to: '', //Send email to
    subject: '', //Email subject
    text: '', //content of email
}

transporter.sendmail(mailOptions, (err,data) =>{
    if(err) return console.log(err)
    else return console.log('Email Sent')
})
*/

const insertZalora = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let tracker = data.trackingNumber
    let status = "IN WAREHOUSE"
    let parcelStatus = {
        statusDetail: status, 
        dateUpdated: date,
        updateBy: data.username, 
        updateById: data.userID, 
        updateByPos: data.userPos
    }
    let inventory = new inventoryDB ({
        trackingNumber: tracker,
        parcelNumber: data.parcelNumber,
        patientNumber: data.patientNum,
        name: data.name,
        contact: data.contact,
        address: data.address,
        area: data.area,
        areaIndicator: data.areaLoc,
        task: data.taskCB,
        tag: data.zaloraTag,
        product:data.formMETHOD,
        value: data.value,
        status: status,
        reEntry: "FALSE",
        reason: data.reason,
        remark: data.remark,
        note: data.note,
        attemp: "FALSE",
        reSchedule: data.reSchedule,
        dateArrive: data.dateArrive,
        dateEntry: data.dateEntry,
        userName: data.username,
        userID: data.userID,
        userPos: data.userPos,
        count: 0,
    })
    inventory.history.push(parcelStatus)
    inventory.save(err=>{
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

const insertPharmacy = ((req,res)=> {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let tracker = data.trackingNumber
    let status = "IN WAREHOUSE"
    let parcelStatus = {
        statusDetail: status, 
        dateUpdated: date,
        updateBy: data.username, 
        updateById: data.userID, 
        updateByPos: data.userPos
    }
    let inventory = new inventoryDB ({
        trackingNumber: tracker,
        parcelNumber: data.parcelNumber,
        patientNumber: data.patientNum,
        name: data.name,
        contact: data.contact,
        address: data.address,
        area: data.area,
        areaIndicator: data.areaLoc,
        task: data.taskCB,
        tag: data.zaloraTag,
        product:data.formMETHOD,
        value: data.value,
        status: status,
        reEntry: "FALSE",
        reason: data.reason,
        remark: data.remark,
        note: data.note,
        attemp: "FALSE",
        reSchedule: data.reSchedule,
        dateArrive: data.dateArrive,
        dateEntry: data.dateEntry,
        userName: data.username,
        userID: data.userID,
        userPos: data.userPos,
        count: 0,
    })
    inventory.history.push(parcelStatus)
    inventory.save(err=>{
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

const insertGrp = ((req,res) =>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let tracker = data.trackingNumber
    let status = "IN WAREHOUSE"
    let parcelStatus = {
        statusDetail: status, 
        dateUpdated: date,
        updateBy: data.username, 
        updateById: data.userID, 
        updateByPos: data.userPos
    }
    let inventory = new inventoryDB ({
        trackingNumber: tracker,
        parcelNumber: data.parcelNumber,
        patientNumber: data.patientNum,
        name: data.name,
        contact: data.contact,
        address: data.address,
        area: data.area,
        areaIndicator: data.areaLoc,
        task: data.taskCB,
        tag: data.zaloraTag,
        product:data.formMETHOD,
        value: data.value,
        status: status,
        reEntry: "FALSE",
        reason: data.reason,
        remark: data.remark,
        note: data.note,
        attemp: "FALSE",
        reSchedule: data.reSchedule,
        dateArrive: data.dateArrive,
        dateEntry: data.dateEntry,
        userName: data.username,
        userID: data.userID,
        userPos: data.userPos,
        count: 0,
    })
    inventory.history.push(parcelStatus)
    inventory.save(err=>{
        if (err) {
            console.log (err)
            res.flash('error', `Tracking number already exist | Require fields missing`)
        }
        else{
            console.log('Status: 201 - success entry to database')
            res.status(201).send()
            req.flash('success', `${data} has been added to the database.`)
        }
    })
})

const readItem = ((req,res) =>{
    let id = req.params._id
    let product = req.params.product || "ZALORA"
    let position = currentUser.position
    inventoryDB
        .find({product: product})
        .sort({entryDate: -1})
        .lean()
        .exec((err,data)=>{
            if (err) return console.log(err)
            else {
                inventoryDB
                    .find({product:product})
                    .count({product: product})
                    .exec(function(err,count){
                        if (err) return console.log(err)
                        else {
                            if(position == "AD"){
                                res.status(200)
                                res.render('itemlist', {
                                    item: data,
                                    total: count,
                                    name: currentUser.name,
                                    icNumber: currentUser.icNumber,
                                    position: currentUser.position,
                                    contact: currentUser.contact,
                                    id: currentUser._id,
                                    office: currentUser.office,
                                })
                            }
                            else if(position == "WH"){
                                res.status(200)
                                res.render('itemlist', {
                                    item: data,
                                    total: count,
                                    name: currentUser.name,
                                    icNumber: currentUser.icNumber,
                                    position: currentUser.position,
                                    contact: currentUser.contact,
                                    id: currentUser._id,
                                    office: currentUser.office,
                                })
                            }
                        }
                    })
            }
        })
})

/*
const liveReadItem = ((req,res) => {
    let changestream = inventoryDB.watch()
    changestream.on("change", next => {
        switch (next.operationType){
            case 'insert':
                io.emit('collection update', next.fullDocument.inventoryDB)
                console.log(next.fullDocument.inventoryDB)
            case 'update':
                io.emit('collection update', next.updateDescription.updatedFields.inventoryDB)
                console.log(next.updateDescription.updatedFields.inventoryDB)
        }
    })
})
*/

const updateItemWH = ((req,res) => {
    let data = req.body
    let tracker = data.trackingNumber
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let filter = {trackingNumber: tracker}
    let update = {adress: data.adress, contact: data.contact,area: data.area, areaIndicator: data.areaIndicator,
        $push: {
            editHistory: {
                oldAddress: data.oldAddress,
                oldContact: data.oldContact,
                oldArea: data.oldArea,
                oldAreaIndicator: data.oldAreaIndicator,
                editedBy: data.username,
                editedAt: date,
            }
        }
    }
    let option = {upsert: true, new: true}
    inventoryDB.findOneAndUpdate(filter,update,option, (err,result)=>{
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

const updateItemTC = ((req,res) => {
    let tracker = req.body.trackingNumber
    let date = moment().format("")
    let filter = {trackingNumber: tracker}
    let update = {adress: req.body.adress, contact: req.body.contact,area: req.body.area, areaIndicator: req.body.areaIndicator,
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
    let option = {upsert: true, new: true}
    inventoryDB.findOneAndUpdate(filter,update,option, (err,result)=>{
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

const updateForOut = ((req,res)=> {
    let status = {status: req.body.status}
    let statusParcel = "READY FOR SELF-COLLECT"
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let tracker = {trackingNumber: req.body.trackingNum}
    let track = req.body.trackingNumber
    let update = {
        status: statusParcel, 
        $push:{
            history: {
                statusDetail: statusParcel, 
                dateUpdated: date,
                updateBy: req.body.username, 
                updateById: req.body.userID, 
                updateByPos: req.body.userPos
            }
        }
    }
    let option = {upsert: true, new: true}
    inventoryDB.findOne(tracker, (err,result) => {
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
    inventoryDB.findOneAndUpdate(tracker,update,option,(err,docs) => {
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

const updateSelfCollect = ((req,res) => {
    let data = req.body
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let statusParcel = "SELF-COLLECTED"
    let filter = {$or: [{trackingNumber: data.trackingNumber}, {grpTrack: data.trackingNumber}]}
    let option = {upsert: false, new: false}
    let update = {

    }
    inventoryDB.findOneAndUpdate(filter, update, option, (err,docs) => {
        if (err) {
            console.log(err)
            console.log(`${tracker} failed to be updated.`)
            res.status(400).send()
            res.flash('error', `Failed to update ${tracker}`)  
        }
        else {
            console.log(result)
            console.log(`${tracker} has been updated.`)
            res.status(201).send()
            res.flash('success', `${tracker} has been updated.`)
            res.render('success', {
            })
            res.end()
        }
    })
})



//configure changestream success append to front end
//configure socket success
//configure nodemailer done need to identify which to be sent.

module.exports = {
    insertZalora,
    insertPharmacy,
    insertGrp,
    readItem,
    updateItemWH,
    updateItemTC,
    updateForOut,
    updateSelfCollect,
}