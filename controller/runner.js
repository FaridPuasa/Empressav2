const warehouseDB = require('../models/warehouseInventory')
const runnerPodDB = require('../models/runnerpod')
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
    Service code = 400
*/

const insertRunner = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY")
    let dateEntry = moment().format("DD/MM/YYYY")
    let data = req.body
    let name = data.name.replace(/[`'"+@]+/g, '').trim()
    let address = data.address.replace(/[`'"+@]+/g, '').trim()
    let contact = data.contactNumber.replace(/[`'"+@]+/g, '').trim()
    let remark = data.remark.replace(/[`'"+@]+/g, '').trim()
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
        contactName: name,
        contactNumber: contact,
        contactAddress: address,
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
        remark: remark,
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
            if (err.name === "MongoServerError" && err.code === 11000) {
                console.log(err)
                req.flash('error', `Error Code: 11000 | Tracking number already exist | Require fields missing.`)
                res.redirect('/zalora-in')
            }
            else {
                console.log(err)
                req.flash('error', `Status 406: Not Acceptable | Check your data entry.`)
                res.redirect('/zalora-in')
            }
        }
        else {
            console.log('Status: 200 - success entry to database')
            req.flash('success', `${data} has been added to the database.`)
            res.status(200).redirect('/zalora-in')
        }
    })
})

const insertPodRunner = ((req,res)=>{
    let date = moment().format("DD/MM/YYYY")
    let data = req.body
    let podSequence = data.podSequence
    let status_pod = "P1"
    let acknowledge = "F" 
    let pod_id = "GR/POD/RUN: " + podSequence
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
            }
            else{
                console.log(`Successfully update: ${trackingNumber}`)               
            }
        })
    }
    let pod = new runnerPodDB ({
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
        if (err) {
            console.log("Error on Creating LOCAL POD")
            console.log(err)
            res.render('error', {
                title: "Error",
                code: '404',
                response: 'Server failed to create information to database',
                message: 'Please logout and try again. If the issue persist contact +673 233 2065 ext 812',
                user,
            })
        }
        else {
            console.log(doc)
            console.log('Status: 200 - success entry to database')
            res.render('Success', {
                title: 'Success',
                code: '200',
                response: 'MOH POD has been created.',
                message: 'An email has been sent to Finance Department for their action.',
                user
            })
        }
    })
})

const updateRunnerPodStatus = ((req,res)=>{
    let sessionuser = req.session.user
    let user = sessionuser
    let data = req.body
    let pod_id = data.pod_id
    let podstatus = data.pod_status
    let filter = { pod_id }
    console.log(filter)
    let update = { podstatus }
    let option = { upsert: false, new: false }
    let date = moment().format("DD/MM/YYYY")
    let tracker = data.trackingNumber
    console.log(tracker)
    for (let i = 0; i < tracker.length; i++) {
        let filter1 = { trackingNumber: data.trackingNumber[i] }
        console.log(filter1)
        let update1 = {
            currentStatus: "C", //need to find a way to change to C
            lastUpdate: date,
            $push: {
                history: {
                    statusDetail: "C",
                    dateUpdated: date,
                    updateBy: data.username,
                    updateById: data.uid,
                }
            }
        }
        let option1 = { upsert: false, new: false }
        console.log(filter1)
        warehouseDB.find(filter1).then(
            (result) => {
                console.log('result: '+ result[0].count)
                if (result[0].count == "0") {
                    let count = result[0].count + 1
                    result[0].count = count
                    console.log("result.count " + count)
                    result[0].save()
                    console.log("Success update")
                }
                else if (result[0].count <= "2") {
                    let count = result[0].count + 1
                    result[0].count = count
                    console.log("result.count " + count)
                    result[0].save()
                    console.log("Success update")
                }
                else if (result[0].count > "2") {
                    let count = "" //max attempt reached.
                    result[0].count = count
                    console.log("result.count " + count)
                    result[0].save()
                    console.log("Success update")
                }
                else {
                    console.log("Error on updating count the information on database")
                    res.render('error', {
                        title: "Error",
                        code: '400',
                        response: 'Server failed to update information to database',
                        message: 'Please logout and try again. If the issue persist contact +673 233 2065 ext 812',
                        user,
                    })
                }
            },
            (err) => {
                console.log("Error on getting the information on database")
                console.log(err)
                res.render('error', {
                    title: "Error",
                    code: '404',
                    response: 'Server failed to retrive information from database',
                    message: 'Please logout and try again. If the issue persist contact +673 233 2065 ext 812',
                    user,
                })
            }
        )
        warehouseDB.findOneAndUpdate(filter1, update1, option1, (err, result) => {
            if (err) {
                console.log("Error on updating the information on database")
                console.log(err)
                res.render('error', {
                    title: "Error",
                    code: '400',
                    response: 'Server failed to update information to database',
                    message: 'Please logout and try again. If the issue persist contact +673 233 2065 ext 812',
                    user,
                })
            }
            else {
                console.log(result)
                console.log('Status: 200 - database has been updated')
                res.render('Success', {
                    title: 'Success',
                    code: '200',
                    response: 'Successful update to database',
                    message: 'All tracking numbers has been updated',
                    user
                })
            }
        })
    }
    runnerPodDB.findOneAndUpdate(filter, update, option, (err, docs) => {
        if (err) {
            console.log("Error on updating the information on database")
            console.log(err)
            res.render('error', {
                title: "Error",
                code: '400',
                response: 'Server failed to update information to database',
                message: 'Please logout and try again. If the issue persist contact +673 233 2065 ext 812',
                user,
            })
        }
        else {
            console.log(docs)
            console.log('Status: 200 - database has been updated')
            res.render('Success', {
                title: 'Success',
                code: '200',
                response: 'Successful update to database',
                message: 'All tracking numbers has been updated',
                user
            })
        }
    })
})

const financeAcknowledgeRunner = ((req,res)=>{
    let data = req.body
    let pod_id = data.pod_id
    let acknowledge = "T"
    let filter = {pod_id}
    let update = {
        acknowledge,
        financeNotes: data.fincanceNotes,
    }
    let option = {upsert: false, new: false}
    runnerPodDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
        if(err) {
            req.flash('error', `Failed to acknowledge POD.`)
            res.redirect('/runner-podlist')
        }
        else{
            req.flash('success', `POD Acknowledged.`)
            res.redirect('/runner-podlist')
            console.log(docs)
            console.log("pod acknowledge")
        }
    })
})

const updateRunnerSelf = ((req,res) =>{
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
                updateBy: data.username, 
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
    insertRunner,
    insertPodRunner,
    updateRunnerPodStatus,
    updateRunnerSelf,
    updateRunner,
    financeAcknowledgeRunner
}