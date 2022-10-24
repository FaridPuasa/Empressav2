const zaloraDB = require('../models/zaloras')
const pharmacyDB = require('../models/pharmacies')
const grpDB = require('../models/grps')
const runnerDB = require('../models/runners')
const personalDB = require('../models/personals')
const miscDB = require('../models/miscs')
const fmxDB = require('../models/fmxs')
const stockDB = require('../models/stocks')
const moment = require('moment')

//All insert or new item controller

const insertZalora = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
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
    let zalora = new zaloraDB ({
        trackingNumber: tracker,
        name: data.name,
        contact: data.contact,
        address: data.address,
        area: data.area,
        areaIndicator: data.areaLoc,
        task: data.taskCB,
        tag: data.zaloraTag,
        value: data.value,
        status: status,
        reEntry: "FALSE",
        reason: data.reason,
        remark: data.remark,
        note: data.note,
        attemp: "FALSE",
        reSchedule: data.reSchedule,
        dateArrive: date,
        dateEntry: dateEntry,
        userName: data.username,
        userID: data.userID,
        userPos: data.userPos,
        count: 0,
        product:data.formMETHOD,
    })
    zalora.history.push(parcelStatus)
    zalora.save(err=>{
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
    let dateEntry = moment().format("DD/MM/YYYY")
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
    let pharmacy = new pharmacyDB ({
        trackingNumber: tracker,
        patientNumber: data.patientNum,
        name: data.name,
        contact: data.contact,
        address: data.address,
        area: data.area,
        areaIndicator: data.areaLoc,
        task: data.taskCB,
        tag: data.zaloraTag,
        value: data.value,
        status: status,
        reEntry: "FALSE",
        reason: data.reason,
        remark: data.remark,
        note: data.note,
        attemp: "FALSE",
        reSchedule: data.reSchedule,
        dateArrive: date,
        dateEntry: dateEntry,
        userName: data.username,
        userID: data.userID,
        userPos: data.userPos,
        count: 0,
        product:data.formMETHOD,
    })
    pharmacy.history.push(parcelStatus)
    pharmacy.save(err=>{
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
    let dateEntry = moment().format("DD/MM/YYYY")
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
    let grp = new grpDB ({
        trackingNumber: tracker,
        
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
        dateArrive: date,
        dateEntry: dateEntry,
        userName: data.username,
        userID: data.userID,
        userPos: data.userPos,
        count: 0,
    })
    grp.history.push(parcelStatus)
    grp.save(err=>{
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
        consignment: data.consignment,
        name: data.name,
        contact: data.contact,
        address: data.address,
        area: data.area,
        areaIndicator: data.areaIndicator,
        product: data.formMETHOD,
        value: data.value,
        reEntry: "FALSE",
        reason: data.reason,
        remark: data.remark,
        note: data.note,
        reSchedule: data.reSchedule,
        dateArrive: date,
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

const insertRunner = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
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
    let runner = new runnerDB ({
        trackingNumber: tracker,
        
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
        dateArrive: date,
        dateEntry: dateEntry,
        userName: data.username,
        userID: data.userID,
        userPos: data.userPos,
        count: 0,
    })
    runner.history.push(parcelStatus)
    runner.save(err=>{
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

const insertPersonal = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
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
    let personal = new personalDB ({
        trackingNumber: tracker,
        
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
        dateArrive: date,
        dateEntry: dateEntry,
        userName: data.username,
        userID: data.userID,
        userPos: data.userPos,
        count: 0,
    })
    personal.history.push(parcelStatus)
    personal.save(err=>{
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

const insertStock = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let stock = new stockDB({
        productBrand: data.productBrand,
        productName: data.productName,
        productDescription: data.productDescription,
        productEntity: data.productEntity,
        productCategory: data.productCategory,
        productQuantity: data.productQuantity,
        productPrice: data.productPrice,
        productSalePrice: data.productSalePrice,
        productVariety: data.productVariety,
        productVarietyQuantity: data.productVarietyQuantity,
        createdBy: data.createdBy,
        dateCreated: date,
    })
    stock.save(err=>{
        if(err){
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

module.exports ={
    insertZalora,
    insertRunner,
    insertPharmacy,
    insertPersonal,
    insertGrp,
    insertFmx,
    insertStock,
}

