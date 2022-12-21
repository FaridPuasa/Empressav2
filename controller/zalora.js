const warehouseDB = require('../models/warehouseInventory')
const zaloraPodDB = require('../models/zalorapod')
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
    Service code = 100
*/

const insertZalora = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let status = "A1"
    let attempt = 'false'
    let reentry = 'false'
    let reschedule = 'false'
    let paymentStatus = "F"
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
        deliveryType: data.delvieryType,
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
            res.redirect('/:service-in')
        }
    })
})

const insertPodZalora = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    let podSequence = data.podSequence
    let status_pod = "P1" 
    let acknowledge = "F"
    let pod_id = "GR/POD/ZAL: " + podSequence
    let trackingNumber = data.trackingNumber
    for (let i = 0; i < trackingNumber.length; i++){
        let filter = {trackingNumber: trackingNumber[i]}
        let update = {
            status: "B", //need to find a way to change to delivery in progress
            lastUpdate: date,
            driver: data.dispatcherName,
            did: data.agentName,
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
    let pod = new zaloraPodDB ({
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
                response: `GR/POD/ZAL: ${podSequence}`,
                message: 'Successfully save the POD documents to database'
            })
        }
    })
})

const updateZaloraPod = ((req,res) =>{
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

const updateZaloraPodStatus = ((req,res)=>{
    let data = req.body
    let pod_id = data.pod_id
    let podstatus = data.pod_status
    let filter = {pod_id}
    let update = {podstatus}
    let option = {upsert: false, new: false}
    zaloraPodDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
        if(err) {
            req.flash('error', `Failed to update POD status.`)
            res.redirect('/zalora-podlist')
        }
        else{
            req.flash('success', `POD status updated.`)
            res.redirect('/zalora-podlist')
            console.log(docs)
            console.log("POD status change to " + podstatus)
        }
    })
})

const financeAcknowledgeZalora = ((req,res)=>{
    let data = req.body
    let pod_id = data.pod_id
    let acknowledge = "T"
    let filter = {pod_id}
    let update = {
        acknowledge,
        financeNotes: data.fincanceNotes,
    }
    let option = {upsert: false, new: false}
    zaloraPodDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
        if(err) {
            req.flash('error', `Failed to acknowledge POD.`)
            res.redirect('/zalora-podlist')
        }
        else{
            req.flash('success', `POD Acknowledged.`)
            res.redirect('/zalora-podlist')
            console.log(docs)
            console.log("POD status change to " + podstatus)
        }
    })
})


const updateZaloraSelf = ((req,res) =>{
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")
    let filter = data.trackingNumber
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

module.exports = {
    insertZalora,
    insertPodZalora,
    updateZaloraPod,
    updateZaloraPodStatus,
    updateZaloraSelf,
    updateZalora,
    financeAcknowledgeZalora
}