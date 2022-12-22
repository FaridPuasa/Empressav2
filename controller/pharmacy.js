const warehouseDB = require('../models/warehouseInventory')
const mohPodDB = require ('../models/mohpod')
const jpmcPodDB = require('../models/jpmcpod')
const panagaPodDB = require('../models/panagapod')
const moment = require('moment')


/*
    IN WAREHOUSE = A1
    IN MEDICINE ROOM = A2
    RE-ENTRY = A3
    SCHEDULE FOR DELIVERY = B
    DELIVERY IN PROGRESS = C
    SUCCESSFUL DELIVERY = D1
    SELF COLLECT = D2
    FAILED DELIVERY = D3
    CANCELLED DELIVERY = D4
*/

/*
    Service code = 200,201,202
*/

const insertPharmacy = ((req,res)=> {
    let date = moment().format("DD/MM/YYYY")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let status = "A2"
    let attempt = 'false'
    let reentry = 'false'
    let reschedule = 'false'
    let paymentStatus = "F"
    let service = data.service
    let startCount = 0
    let parcelStatus = {
        statusHistory: status, 
        dateUpdated: dateEntry,
        updateBy: data.username, 
        updateById: data.uid, 
    }
    let warehouse = new warehouseDB ({
        //Main
        trackingNumber: data.trackingNumber,
        contactName: data.name,
        contactNumber: data.contact,
        contactAddress: data.address,
        patientNumber: data.patientNumber,
        areaCode: data.areaCode,
        serviceTag: data.serviceTag,
        shelfCode: data.shelfCode,
        zone: data.zone,
        fridgeItem: data.fridgeItem,
        deliveryType: data.deliveryType,
        paymentType: data.paymentType,
        paymentStatus: paymentStatus,
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
    //if
    warehouse.history.push(parcelStatus)
    warehouse.save(err=>{
        if (err) {
            if(err.name === "MongoServerError" && err.code === 11000){
                console.log (err)
                req.flash('error', `Error Code: 11000 | Tracking number already exist | Require fields missing.`)
                res.redirect('')
            }
            else{
                console.log (err)
                req.flash('error', `Status 406: Not Acceptable | Check your data entry.`)
                res.redirect('/moh-in')
            }
        }
        else{
            let service = req.params.service
            console.log('Status: 200 - success entry to database')
            req.flash('success', `${data} has been added to the database.`)
            res.status(200).redirect('/moh-in')
        }
    })
    //end if
})
//End - Insert Item

//Start - Create POD MOH
const insertPodMoh = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY")
    let data = req.body
    console.log(data)
    let podsequence = data.podsequence
    let status_pod = "P1"
    let acknowledge = "F"
    let pod_id = 'GR/POD/MOH:' + podsequence
    let trackingNumber = data.trackingNumber
    console.log(trackingNumber)
    for (let i = 0; i < trackingNumber.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "B", //need to find a way to change to delivery in progress
            lastUpdate: date,
            did: data.agentName,
            driver: data.dispatcherName,
            deliveryDate: date,
            $push: {
                history: {
                    statusHistory: "B", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.uid, 
                }
            }
        }
        let option = {upsert: false, new: false}
        warehouseDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
            if (err){
                //console.log(`Failed update: ${trackingNumber}`)
               //req.flash('error', `Failed to update: ${trackingNumber}`)
            }
            else{
                console.log(`Successfully update: ${trackingNumber[i]}`)
                //req.flash('success', `${trackingNumber} has been updated on the database.`)
                //res.status(201).send()
            }
        })
    }
    let pod = new mohPodDB ({
        pod_id: pod_id,
        madeby: data.madeby,
        deliveryArea: data.deliveryArea,
        agentName: data.dispatcherName,
        did: data.agentName,
        deliveryDate: data.deliveryDate,
        podsequence,
        podstatus: status_pod,
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
        acknowledge: acknowledge
    })
    pod.save((err,doc)=>{
        if (err){
            console.log (err)
            //res.flash('error', `Tracking number already exist | Require fields missing`)
            res.render('error', {
                title: 'xxx',
                response: 'Not Acceptable &#x1F62B;',
                message: 'No worries~ database detected duplication of tracking number.'
            })
        }
        else{
            console.log(doc)
            //console.log('Status: 201 - success entry to database')
            //req.flash('success', `${data} has been added to the database.`)
            res.render('success', {
                title: 'POD Success',
                response: `GR/POD/ZAL:${podsequence}`,
                message: 'Successfully save the POD documents to database'
            })
        }
    })
})
//End - Create POD MOH

//Start - Create POD JPMC
const insertPodJpmc = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let podSequence = data.podSequence
    let status_pod = "P1" 
    let acknowledge = "F"
    let pod_id = 'GR/POD/JPMC:' + podSequence
    let trackingNumber = data.trackingNumberTemp
    for (let i = 0; i < trackingNumber.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "B", //need to find a way to change to delivery in progress
            lastUpdate: date,
            did: data.agentName,
            driver: data.dispatcherName,
            $push: {
                history: {
                    statusHistory: "B", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.uid, 
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
        agentName: data.dispatcherName,
        did: data.agentName,
        deliveryDate: data.deliveryDate,
        podSequence: podSequence,
        podstatus: status_pod,
        numbers: data.numbers,
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactAddress: data.contactAddress,
        contactNumber: data.contactNumber,
        parcelValue: data.parcelValue,
        PaymentMethod: data.PaymentMethod,
        deliveryType: data.deliveryType,
        createdAt: date,
        acknowledge: acknowledge
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
//End - Create POD JPMC

//Start - Create POD Panaga
const insertPodPanaga = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let podSequence = data.podSequence
    let status_pod = "P1" 
    let acknowledge = "F"
    let pod_id = 'GR/POD/PNG:' + podSequence
    let trackingNumber = data.trackingNumber
    for (let i = 0; i < trackingNumber.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "B", //need to find a way to change to delivery in progress
            lastUpdate: date,
            did: data.agentName,
            driver: data.dispatcherName,
            $push: {
                history: {
                    statusHistory: "B", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.uid, 
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
        agentName: data.dispatcherName,
        did: data.agentName,
        deliveryDate: data.deliveryDate,
        podSequence: podSequence,
        podstatus: status_pod,
        numbers: data.numbers,
        trackingNumber: data.trackingNumber,
        contactName: data.contactName,
        contactAddress: data.contactAddress,
        contactNumber: data.contactNumber,
        parcelValue: data.parcelValue,
        PaymentMethod: data.PaymentMethod,
        deliveryType: data.deliveryType,
        createdAt: date,
        acknowledge: acknowledge
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
//End - Create POD Panaga

//Start - Update Item MOH
const updateMohPod = ((req,res) =>{
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")
    let tracker = data.trackingNumber
    console.log(tracker)
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "C", //need to find a way to change to C
            lastUpdate: date,
            $push: {
                history: {
                    statusDetail: "C", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                }
            }
        }
        let option = {upsert: false, new: false}
        console.log(filter)
        warehouseDB.find(filter).then(
            (result)=> {
                if (result.count == "0"){
                    let count = result.count + 1
                    result.count = count 
                    console.log("result.count " + count)
                    result.save()
                    console.log("Success update")
                }
                else if(result.count <= "2"){
                    let count = result.count + 1
                    result.count = count
                    console.log("result.count " + count)
                    result.save()
                    console.log("Success update")
                }
                else if(result.count <= "2"){
                    let count = "L" //max attempt reached.
                    result.count = count
                    console.log("result.count " + count)
                    result.save()
                    console.log("Success update")
                }
                else{
                    console.log("Failed to retrieve count")
                }
            },
            (err)=>{
                console.log(err)
            }
        )
        warehouseDB.findOneAndUpdate(filter, update, option, (err,result) => {
            if(err){
                console.log(err)
                res.render('error', {
                    errorcode: 'XXX',
                    response: 'Not Acceptable &#x1F62B;',
                    message: 'No worries~ database detected duplication of tracking number.'
                })
            }
            else {
                console.log(result)
                res.render('sucess', {
                    response: 'Successfuly updated',
                    message: 'Congratulations~ All tracking number has been updated.'
                })
            }
        })
    }
})
//End - Update Item MOH

//Start - Update POD Status
const updateMohPodStatus = ((req,res)=>{
    let data = req.body
    let pod_id = data.pod_id
    let podstatus = data.pod_status
    let filter = {pod_id}
    let update = {podstatus}
    let option = {upsert: false, new: false}
    mohPodDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
        if(err) {
            req.flash('error', `Failed to update POD status.`)
            res.redirect('/moh-podlist')
        }
        else{
            req.flash('success', `POD status updated.`)
            res.redirect('/moh-podlist')
            console.log(docs)
            console.log("POD status change to " + podstatus)
        }
    })
})
//End - Update POD Status

const financeAcknowledgeMoh = ((req,res)=>{
    let data = req.body
    let pod_id = data.pod_id
    let acknowledge = "T"
    let filter = {pod_id}
    let update = {
        acknowledge,
        financeNotes: data.fincanceNotes,
    }
    let option = {upsert: false, new: false}
    mohPodDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
        if(err) {
            req.flash('error', `Failed to acknowledge POD.`)
            res.redirect('/moh-podlist')
        }
        else{
            req.flash('success', `POD Acknowledged.`)
            res.redirect('/moh-podlist')
            console.log(docs)
            console.log("POD status change to " + podstatus)
        }
    })
})

//Start - Update MOH Self
const updateMohSelf = ((req,res) =>{
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")
    let tracker = data.trackingNumber
    let option = {upsert: false, new: false}
    let update = {
        currentStatus: "D2", 
        $push:{
            history: {
                statusDetail: "D2", 
                dateUpdated: date,
                updateBy: data.updateById, 
                updateById: data.uid, 
            }
        }
    }
    console.log(filter)
    warehouseDB.findOneAndUpdate(filter, update, option, (err,result) => {
        if(err){
            console.log(err)
            res.render('error', {
                errorcode: 'XXX',
                response: 'Not Acceptable &#x1F62B;',
                message: 'No worries~ database detected duplication of tracking number.'
            })
        }
        else {
            console.log(result)
            res.render('sucess', {
                response: 'Successfuly updated',
                message: 'Congratulations~ All tracking number has been updated.'
            })
        }
    })
})
//End - Update MOH Self

//Start - Update Item JPMC
const updateJpmcPod = ((req,res) =>{
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")
    let tracker = data.trackingNumber
    console.log(tracker)
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "C", //need to find a way to change to C
            lastUpdate: date,
            $push: {
                history: {
                    statusDetail: "C", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                }
            }
        }
        let option = {upsert: false, new: false}
        console.log(filter)
        warehouseDB.find(filter).then(
            (result)=> {
                if (result.count == "0"){
                    let count = result.count + 1
                    result.count = count 
                    console.log("result.count " + count)
                    result.save()
                    console.log("Success update")
                }
                else if(result.count <= "2"){
                    let count = result.count + 1
                    result.count = count
                    console.log("result.count " + count)
                    result.save()
                    console.log("Success update")
                }
                else if(result.count <= "2"){
                    let count = "L" //max attempt reached.
                    result.count = count
                    console.log("result.count " + count)
                    result.save()
                    console.log("Success update")
                }
                else{
                    console.log("Failed to retrieve count")
                }
            },
            (err)=>{
                console.log(err)
            }
        )
        warehouseDB.findOneAndUpdate(filter, update, option, (err,result) => {
            if(err){
                console.log(err)
                res.render('error', {
                    errorcode: 'XXX',
                    response: 'Not Acceptable &#x1F62B;',
                    message: 'No worries~ database detected duplication of tracking number.'
                })
            }
            else {
                console.log(result)
                res.render('sucess', {
                    response: 'Successfuly updated',
                    message: 'Congratulations~ All tracking number has been updated.'
                })
            }
        })
    }
})
//End - Update Item JPMC

//Start - Update POD Status
const updateJpmcPodStatus = ((req,res)=>{
    let data = req.body
    let pod_id = data.pod_id
    let podstatus = data.pod_status
    let filter = {pod_id}
    let update = {podstatus}
    let option = {upsert: false, new: false}
    jpmcPodDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
        if(err) {
            req.flash('error', `Failed to update POD status.`)
            res.redirect('/jpmc-podlist')
        }
        else{
            req.flash('success', `POD status updated.`)
            res.redirect('/jpmc-podlist')
            console.log(docs)
            console.log("POD status change to " + podstatus)
        }
    })
})
//End - Update POD Status

const financeAcknowledgeJpmc = ((req,res)=>{
    let data = req.body
    let pod_id = data.pod_id
    let acknowledge = "T"
    let filter = {pod_id}
    let update = {
        acknowledge,
        financeNotes: data.fincanceNotes,
    }
    let option = {upsert: false, new: false}
    jpmcPodDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
        if(err) {
            req.flash('error', `Failed to acknowledge POD.`)
            res.redirect('/jpmc-podlist')
        }
        else{
            req.flash('success', `POD Acknowledged.`)
            res.redirect('/jpmc-podlist')
            console.log(docs)
            console.log("POD status change to " + podstatus)
        }
    })
})

//Start - Update JPMC Self
const updateJpmcSelf = ((req,res) =>{
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")
    let tracker = data.trackingNumber
    let option = {upsert: false, new: false}
    let update = {
        currentStatus: "D2", 
        $push:{
            history: {
                statusDetail: "D2", 
                dateUpdated: date,
                updateBy: data.updateById, 
                updateById: data.uid, 
            }
        }
    }
    console.log(filter)
    warehouseDB.findOneAndUpdate(filter, update, option, (err,result) => {
        if(err){
            console.log(err)
            res.render('error', {
                errorcode: 'XXX',
                response: 'Not Acceptable &#x1F62B;',
                message: 'No worries~ database detected duplication of tracking number.'
            })
        }
        else {
            console.log(result)
            res.render('sucess', {
                response: 'Successfuly updated',
                message: 'Congratulations~ All tracking number has been updated.'
            })
        }
    })
})
//End - Update JPMC Self

//Start - Update Item Panaga
const updatePanagaPod = ((req,res) =>{
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")
    let tracker = data.trackingNumber
    console.log(tracker)
    for (let i = 0; i < tracker.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "C", //need to find a way to change to C
            lastUpdate: date,
            $push: {
                history: {
                    statusDetail: "C", 
                    dateUpdated: date,
                    updateBy: data.username, 
                    updateById: data.userID, 
                }
            }
        }
        let option = {upsert: false, new: false}
        console.log(filter)
        warehouseDB.find(filter).then(
            (result)=> {
                if (result.count == "0"){
                    let count = result.count + 1
                    result.count = count 
                    console.log("result.count " + count)
                    result.save()
                    console.log("Success update")
                }
                else if(result.count <= "2"){
                    let count = result.count + 1
                    result.count = count
                    console.log("result.count " + count)
                    result.save()
                    console.log("Success update")
                }
                else if(result.count <= "2"){
                    let count = "L" //max attempt reached.
                    result.count = count
                    console.log("result.count " + count)
                    result.save()
                    console.log("Success update")
                }
                else{
                    console.log("Failed to retrieve count")
                }
            },
            (err)=>{
                console.log(err)
            }
        )
        warehouseDB.findOneAndUpdate(filter, update, option, (err,result) => {
            if(err){
                console.log(err)
                res.render('error', {
                    errorcode: 'XXX',
                    response: 'Not Acceptable &#x1F62B;',
                    message: 'No worries~ database detected duplication of tracking number.'
                })
            }
            else {
                console.log(result)
                res.render('sucess', {
                    response: 'Successfuly updated',
                    message: 'Congratulations~ All tracking number has been updated.'
                })
            }
        })
    }
})
//End - Update Item Panaga

//Start - Update POD Status
const updatePanagaPodStatus = ((req,res)=>{
    let data = req.body
    let pod_id = data.pod_id
    let podstatus = data.pod_status
    let filter = {pod_id}
    let update = {podstatus}
    let option = {upsert: false, new: false}
    panagaPodDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
        if(err) {
            req.flash('error', `Failed to update POD status.`)
            res.redirect('/panaga-podlist')
        }
        else{
            req.flash('success', `POD status updated.`)
            res.redirect('/panaga-podlist')
            console.log(docs)
            console.log("POD status change to " + podstatus)
        }
    })
})
//End - Update POD Status

const financeAcknowledgePanaga = ((req,res)=>{
    let data = req.body
    let pod_id = data.pod_id
    let acknowledge = "T"
    let filter = {pod_id}
    let update = {
        acknowledge,
        financeNotes: data.fincanceNotes,
    }
    let option = {upsert: false, new: false}
    panagaPodDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
        if(err) {
            req.flash('error', `Failed to acknowledge POD.`)
            res.redirect('/panaga-podlist')
        }
        else{
            req.flash('success', `POD Acknowledged.`)
            res.redirect('/panaga-podlist')
            console.log(docs)
            console.log("POD status change to " + podstatus)
        }
    })
})

//Start - Update Panaga Self
const updatePanagaSelf = ((req,res) =>{
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")
    let tracker = data.trackingNumber
    let option = {upsert: false, new: false}
    let update = {
        currentStatus: "D2", 
        $push:{
            history: {
                statusDetail: "D2", 
                dateUpdated: date,
                updateBy: data.updateById, 
                updateById: data.uid, 
            }
        }
    }
    console.log(filter)
    warehouseDB.findOneAndUpdate(filter, update, option, (err,result) => {
        if(err){
            console.log(err)
            res.render('error', {
                errorcode: 'XXX',
                response: 'Not Acceptable &#x1F62B;',
                message: 'No worries~ database detected duplication of tracking number.'
            })
        }
        else {
            console.log(result)
            res.render('sucess', {
                response: 'Successfuly updated',
                message: 'Congratulations~ All tracking number has been updated.'
            })
        }
    })
})
//End - Update Panaga Self

//Start - Update MOH Edit Details
const updateMoh = ((req,res) => {
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
    warehouseDB.findOneAndUpdate(filter,update,option, (err,result)=>{
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
//End - Update MOH Edit Details

//Start - Update JPMC Edit Details
const updateJpmc = ((req,res) => {
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
    warehouseDB.findOneAndUpdate(filter,update,option, (err,result)=>{
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
//End - Update JPMC Edit Details

//Start - Update Panaga Edit Details
const updatePanaga = ((req,res) => {
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
    warehouseDB.findOneAndUpdate(filter,update,option, (err,result)=>{
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
//End - Update Panaga Edit Details



module.exports = {
    insertPharmacy,
    insertPodMoh,
    insertPodJpmc,
    insertPodPanaga,
    updateMohPod,
    updateMohPodStatus,
    updateMohSelf,
    updateJpmcPod,
    updateJpmcPodStatus,
    updateJpmcSelf,
    updatePanagaPod,
    updatePanagaPodStatus,
    updatePanagaSelf,
    updateMoh,
    updateJpmc,
    updatePanaga,
    financeAcknowledgePanaga,
    financeAcknowledgeJpmc,
    financeAcknowledgeMoh
}