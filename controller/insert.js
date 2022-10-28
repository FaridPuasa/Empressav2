const warehouseDB = require('../models/warehouseInventory')
const stockDB = require('../models/stocks')
const mohPodDB = require ('../models/mohpod')
const jpmcPodDB = require('../models/jpmcpod')
const panagaPodDB = require('../models/panagapod')
const zaloraPodDB = require('../models/zalorapod')
const fmxPodDB = require('../models/fmxpod')
const grpPodDB = require('../models/grppod')
const runnerPodDB = require('../models/runnerpod')
const personalPodDB = require('../models/personalpod')
const moment = require('moment')

//All insert or new item controller
const insertZalora = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let status = "IN WAREHOUSE"
    let attempt = 'false'
    let reentry = 'false'
    let reschedule = 'false'
    let startCount = 0
    let parcelStatus = {
        statusDetail: status, 
        dateUpdated: dateEntry,
        updateBy: data.username, 
        updateById: data.userID, 
    }
    let warehouse = new warehouseDB ({
        //Main
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactNumber: data.contactNumber,
        contactAddress: data.contactAddress,
        patientNumber: data.patientNumber,
        areaCode: data.areaCode,
        serviceTag: data.serviceTag,
        shelfCode: data.shelfCode,
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
        //Extra
        attempt: attempt,
        reentry: reentry,
        reschedule: reschedule,
        count: startCount,
    })
    warehouse.history.push(parcelStatus)
    warehouse.save(err=>{
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
})

const insertPharmacy = ((req,res)=> {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let status = "IN MEDICINE ROOM"
    let attempt = 'false'
    let reentry = 'false'
    let reschedule = 'false'
    let startCount = 0
    let parcelStatus = {
        statusDetail: status, 
        dateUpdated: dateEntry,
        updateBy: data.username, 
        updateById: data.userID, 
    }
    let warehouse = new warehouseDB ({
        //Main
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactNumber: data.contactNumber,
        contactAddress: data.contactAddress,
        patientNumber: data.patientNumber,
        areaCode: data.areaCode,
        serviceTag: data.serviceTag,
        shelfCode: data.shelfCode,
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
        //Extra
        attempt: attempt,
        reentry: reentry,
        reschedule: reschedule,
        count: startCount,
    })
    warehouse.history.push(parcelStatus)
    warehouse.save(err=>{
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
})

const insertGrp = ((req,res) =>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let status = "IN WAREHOUSE"
    let attempt = 'false'
    let reentry = 'false'
    let reschedule = 'false'
    let startCount = 0
    let parcelStatus = {
        statusDetail: status, 
        dateUpdated: dateEntry,
        updateBy: data.username, 
        updateById: data.userID, 
    }
    let warehouse = new warehouseDB ({
        //Main
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactNumber: data.contactNumber,
        contactAddress: data.contactAddress,
        patientNumber: data.patientNumber,
        areaCode: data.areaCode,
        serviceTag: data.serviceTag,
        shelfCode: data.shelfCode,
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
        //Extra
        attempt: attempt,
        reentry: reentry,
        reschedule: reschedule,
        count: startCount,
    })
    warehouse.history.push(parcelStatus)
    warehouse.save(err=>{
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
})

const insertFmx = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let status = "IN WAREHOUSE"
    let attempt = 'false'
    let reentry = 'false'
    let reschedule = 'false'
    let startCount = 0
    let parcelStatus = {
        statusDetail: status, 
        dateUpdated: dateEntry,
        updateBy: data.username, 
        updateById: data.userID, 
    }
    let warehouse = new warehouseDB ({
        //Main
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactNumber: data.contactNumber,
        contactAddress: data.contactAddress,
        patientNumber: data.patientNumber,
        areaCode: data.areaCode,
        serviceTag: data.serviceTag,
        shelfCode: data.shelfCode,
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
        //Extra
        attempt: attempt,
        reentry: reentry,
        reschedule: reschedule,
        count: startCount,
    })
    warehouse.history.push(parcelStatus)
    warehouse.save(err=>{
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
})

const insertRunner = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let status = "IN WAREHOUSE"
    let attempt = 'false'
    let reentry = 'false'
    let reschedule = 'false'
    let startCount = 0
    let parcelStatus = {
        statusDetail: status, 
        dateUpdated: dateEntry,
        updateBy: data.username, 
        updateById: data.userID, 
    }
    let warehouse = new warehouseDB ({
        //Main
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactNumber: data.contactNumber,
        contactAddress: data.contactAddress,
        patientNumber: data.patientNumber,
        areaCode: data.areaCode,
        serviceTag: data.serviceTag,
        shelfCode: data.shelfCode,
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
        //Extra
        attempt: attempt,
        reentry: reentry,
        reschedule: reschedule,
        count: startCount,
    })
    warehouse.history.push(parcelStatus)
    warehouse.save(err=>{
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
})

const insertPersonal = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let status = "IN WAREHOUSE"
    let attempt = 'false'
    let reentry = 'false'
    let reschedule = 'false'
    let startCount = 0
    let parcelStatus = {
        statusDetail: status, 
        dateUpdated: dateEntry,
        updateBy: data.username, 
        updateById: data.userID, 
    }
    let warehouse = new warehouseDB ({
        //Main
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactNumber: data.contactNumber,
        contactAddress: data.contactAddress,
        patientNumber: data.patientNumber,
        areaCode: data.areaCode,
        serviceTag: data.serviceTag,
        shelfCode: data.shelfCode,
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
        //Extra
        attempt: attempt,
        reentry: reentry,
        reschedule: reschedule,
        count: startCount,
    })
    warehouse.history.push(parcelStatus)
    warehouse.save(err=>{
        if (err) {
            console.log (err)
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
})

//Start - create new pod section
const insertPodZalora = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let podSequence = data.podSequence
    let pod_id = "GR/POD/ZAL: " + podSequence
    let trackingNumber = data.trackingNumber
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
            $push: {
                history: {
                    statusDetail: "SCHEDULED FOR DELIVERY", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                }
            }
        }
        let option = {upsert: false, new: false}
        warehouseDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
            if (err){
                console.log(`Failed update: ${trackingNumber}`)
                req.flash('error', `Failed to update: ${trackingNumber}`)
            }
            else{
                console.log(`Successfully update: ${trackingNumber}`)
                req.flash('success', `${trackingNumber} has been updated on the database.`)
                res.status(201).send()
            }
        })
    }
    let pod = new zaloraPodDB ({
        pod_id: pod_id,
        madeby: data.madeby,
        deliveryArea: data.deliveryArea,
        agentName: data.agentName,
        deliveryDate: data.deliveryDate,
        podSequence: podSequence,
        numbers: data.numbers,
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactAddress: data.contactAddress,
        contactNumber: data.contactNumber,
        parcelValue: data.parcelValue,
        PaymentMethod: data.PaymentMethod,
        deliveryType: data.deliveryType,
        createdAt: date,
    })
    pod.save((err,doc)=>{
        if (err){
            console.log (err)
            //res.flash('error', `Tracking number already exist | Require fields missing`)
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
            res.redirect('/success', {
                title: 'POD Success',
                response: `GR/POD/ZAL: ${podSequence}`,
                message: 'Successfully save the POD documents to database'
            })
        }
    })
})

const insertPodFmx = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let podSequence = data.podSequence
    let pod_id = "GR/POD/FMX: " + podSequence
    let trackingNumber = data.trackingNumber
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
            $push: {
                history: {
                    statusDetail: "SCHEDULED FOR DELIVERY", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                }
            }
        }
        let option = {upsert: false, new: false}
        warehouseDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
            if (err){
                console.log(`Failed update: ${trackingNumber}`)
                req.flash('error', `Failed to update: ${trackingNumber}`)
            }
            else{
                console.log(`Successfully update: ${trackingNumber}`)
                req.flash('success', `${trackingNumber} has been updated on the database.`)
                res.status(201).send()
            }
        })
    }
    let pod = new fmxPodDB ({
        pod_id: pod_id,
        madeby: data.madeby,
        deliveryArea: data.deliveryArea,
        agentName: data.agentName,
        deliveryDate: data.deliveryDate,
        podSequence: podSequence,
        numbers: data.numbers,
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactAddress: data.contactAddress,
        contactNumber: data.contactNumber,
        parcelValue: data.parcelValue,
        PaymentMethod: data.PaymentMethod,
        deliveryType: data.deliveryType,
        createdAt: date,
    })
    pod.save((err,doc)=>{
        if (err){
            console.log (err)
            //res.flash('error', `Tracking number already exist | Require fields missing`)
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
            res.redirect('/success', {
                title: 'POD Success',
                response: `GR/POD/FMX: ${podSequence}`,
                message: 'Successfully save the POD documents to database'
            })
        }
    })
})

const insertPodGrp = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let podSequence = data.podSequence
    let pod_id = "GR/POD/GRP: " + podSequence
    let trackingNumber = data.trackingNumber
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
            $push: {
                history: {
                    statusDetail: "SCHEDULED FOR DELIVERY", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                }
            }
        }
        let option = {upsert: false, new: false}
        warehouseDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
            if (err){
                console.log(`Failed update: ${trackingNumber}`)
                req.flash('error', `Failed to update: ${trackingNumber}`)
            }
            else{
                console.log(`Successfully update: ${trackingNumber}`)
                req.flash('success', `${trackingNumber} has been updated on the database.`)
                res.status(201).send()
            }
        })
    }
    let pod = new grpPodDB ({
        pod_id: pod_id,
        madeby: data.madeby,
        deliveryArea: data.deliveryArea,
        agentName: data.agentName,
        deliveryDate: data.deliveryDate,
        podSequence: podSequence,
        numbers: data.numbers,
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactAddress: data.contactAddress,
        contactNumber: data.contactNumber,
        parcelValue: data.parcelValue,
        PaymentMethod: data.PaymentMethod,
        deliveryType: data.deliveryType,
        createdAt: date,
    })
    pod.save((err,doc)=>{
        if (err){
            console.log (err)
            //res.flash('error', `Tracking number already exist | Require fields missing`)
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
            res.redirect('/success', {
                title: 'POD Success',
                response: `GR/POD/GRP: ${podSequence}`,
                message: 'Successfully save the POD documents to database'
            })
        }
    })
})

const insertPodRunner = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let podSequence = data.podSequence
    let pod_id = "GR/POD/RUN: " + podSequence
    let trackingNumber = data.trackingNumber
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
            $push: {
                history: {
                    statusDetail: "SCHEDULED FOR DELIVERY", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                }
            }
        }
        let option = {upsert: false, new: false}
        warehouseDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
            if (err){
                console.log(`Failed update: ${trackingNumber}`)
                req.flash('error', `Failed to update: ${trackingNumber}`)
            }
            else{
                console.log(`Successfully update: ${trackingNumber}`)
                req.flash('success', `${trackingNumber} has been updated on the database.`)
                res.status(201).send()
            }
        })
    }
    let pod = new runnerPodDB ({
        pod_id: pod_id,
        madeby: data.madeby,
        deliveryArea: data.deliveryArea,
        agentName: data.agentName,
        deliveryDate: data.deliveryDate,
        podSequence: podSequence,
        numbers: data.numbers,
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactAddress: data.contactAddress,
        contactNumber: data.contactNumber,
        parcelValue: data.parcelValue,
        PaymentMethod: data.PaymentMethod,
        deliveryType: data.deliveryType,
        createdAt: date,
    })
    pod.save((err,doc)=>{
        if (err){
            console.log (err)
            //res.flash('error', `Tracking number already exist | Require fields missing`)
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
            res.redirect('/success', {
                title: 'POD Success',
                response: `GR/POD/RUN: ${podSequence}`,
                message: 'Successfully save the POD documents to database'
            })
        }
    })
})

const insertPodPersonal = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let podSequence = data.podSequence
    let pod_id = "GR/POD/PS: " + podSequence
    let trackingNumber = data.trackingNumber
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
            $push: {
                history: {
                    statusDetail: "SCHEDULED FOR DELIVERY", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                }
            }
        }
        let option = {upsert: false, new: false}
        warehouseDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
            if (err){
                console.log(`Failed update: ${trackingNumber}`)
                req.flash('error', `Failed to update: ${trackingNumber}`)
            }
            else{
                console.log(`Successfully update: ${trackingNumber}`)
                req.flash('success', `${trackingNumber} has been updated on the database.`)
                res.status(201).send()
            }
        })
    }
    let option = {upsert: false, new: false}
    let pod = new personalPodDB ({
        pod_id: pod_id,
        madeby: data.madeby,
        deliveryArea: data.deliveryArea,
        agentName: data.agentName,
        deliveryDate: data.deliveryDate,
        podSequence: podSequence,
        numbers: data.numbers,
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactAddress: data.contactAddress,
        contactNumber: data.contactNumber,
        parcelValue: data.parcelValue,
        PaymentMethod: data.PaymentMethod,
        deliveryType: data.deliveryType,
        createdAt: date,
    })
    pod.save((err,doc)=>{
        if (err){
            console.log (err)
            //res.flash('error', `Tracking number already exist | Require fields missing`)
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
            res.redirect('/success', {
                title: 'POD Success',
                response: `GR/POD/PS: ${podSequence}`,
                message: 'Successfully save the POD documents to database'
            })
        }
    })
})

const insertPodMoh = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let podSequence = data.podSequence
    let pod_id = 'GR/POD/MOH:' + podSequence
    let trackingNumber = data.trackingNumber
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
            $push: {
                history: {
                    statusDetail: "SCHEDULED FOR DELIVERY", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                }
            }
        }
        let option = {upsert: false, new: false}
        warehouseDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
            if (err){
                console.log(`Failed update: ${trackingNumber}`)
                req.flash('error', `Failed to update: ${trackingNumber}`)
            }
            else{
                console.log(`Successfully update: ${trackingNumber}`)
                req.flash('success', `${trackingNumber} has been updated on the database.`)
                res.status(201).send()
            }
        })
    }
    let option = {upsert: false, new: false}
    let pod = new mohPodDB ({
        pod_id: pod_id,
        madeby: data.madeby,
        deliveryArea: data.deliveryArea,
        agentName: data.agentName,
        deliveryDate: data.deliveryDate,
        podSequence: podSequence,
        numbers: data.numbers,
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactAddress: data.contactAddress,
        contactNumber: data.contactNumber,
        parcelValue: data.parcelValue,
        fridge: data.fridgeItem,
        PaymentMethod: data.PaymentMethod,
        deliveryType: data.deliveryType,
        createdAt: date,
    })
    pod.save((err,doc)=>{
        if (err){
            console.log (err)
            //res.flash('error', `Tracking number already exist | Require fields missing`)
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
            res.redirect('/success', {
                title: 'POD Success',
                response: `GR/POD/ZAL:${podSequence}`,
                message: 'Successfully save the POD documents to database'
            })
        }
    })
})

const insertPodJpmc = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let podSequence = data.podSequence
    let pod_id = 'GR/POD/JPMC:' + podSequence
    let trackingNumber = data.trackingNumber
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
            $push: {
                history: {
                    statusDetail: "SCHEDULED FOR DELIVERY", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                }
            }
        }
        let option = {upsert: false, new: false}
        warehouseDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
            if (err){
                console.log(`Failed update: ${trackingNumber}`)
                req.flash('error', `Failed to update: ${trackingNumber}`)
            }
            else{
                console.log(`Successfully update: ${trackingNumber}`)
                req.flash('success', `${trackingNumber} has been updated on the database.`)
                res.status(201).send()
            }
        })
    }
    let option = {upsert: false, new: false}
    let pod = new jpmcPodDB ({
        pod_id: pod_id,
        madeby: data.madeby,
        deliveryArea: data.deliveryArea,
        agentName: data.agentName,
        deliveryDate: data.deliveryDate,
        podSequence: podSequence,
        numbers: data.numbers,
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactAddress: data.contactAddress,
        contactNumber: data.contactNumber,
        parcelValue: data.parcelValue,
        PaymentMethod: data.PaymentMethod,
        deliveryType: data.deliveryType,
        createdAt: date,
    })
    pod.save((err,doc)=>{
        if (err){
            console.log (err)
            //res.flash('error', `Tracking number already exist | Require fields missing`)
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
            res.redirect('/success', {
                title: 'POD Success',
                response: `GR/POD/JPMC: ${podSequence}`,
                message: 'Successfully save the POD documents to database'
            })
        }
    })
})

const insertPodPanaga = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let podSequence = data.podSequence
    let pod_id = 'GR/POD/PNG:' + podSequence
    let trackingNumber = data.trackingNumber
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "SCHEDULED FOR DELIVERY", //need to find a way to change to delivery in progress
            $push: {
                history: {
                    statusDetail: "SCHEDULED FOR DELIVERY", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                }
            }
        }
        let option = {upsert: false, new: false}
        warehouseDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
            if (err){
                console.log(`Failed update: ${trackingNumber}`)
                req.flash('error', `Failed to update: ${trackingNumber}`)
            }
            else{
                console.log(`Successfully update: ${trackingNumber}`)
                req.flash('success', `${trackingNumber} has been updated on the database.`)
                res.status(201).send()
            }
        })
    }
    let pod = new panagaPodDB ({
        pod_id: pod_id,
        madeby: data.madeby,
        deliveryArea: data.deliveryArea,
        agentName: data.agentName,
        deliveryDate: data.deliveryDate,
        podSequence: podSequence,
        numbers: data.numbers,
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactAddress: data.contactAddress,
        contactNumber: data.contactNumber,
        parcelValue: data.parcelValue,
        PaymentMethod: data.PaymentMethod,
        deliveryType: data.deliveryType,
        createdAt: date,
    })
    pod.save((err,doc)=>{
        if (err){
            console.log (err)
            //res.flash('error', `Tracking number already exist | Require fields missing`)
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
            res.redirect('/success', {
                title: 'POD Success',
                response: `GR/POD/PNG: ${podSequence}`,
                message: 'Successfully save the POD documents to database'
            })
        }
    })
})
//End - create new pod section

module.exports ={
    insertZalora,
    insertPharmacy,
    insertRunner,
    insertPersonal,
    insertGrp,
    insertFmx,
    insertStock,
}

