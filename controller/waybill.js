const waybillDB = require('../models/restock')
const pickupDB = require ('../models/pickup')
const moment = require('moment')

const insertRestock = (req,res)=> {
    let sessionuser = req.session.user
    let user = sessionuser
    console.log(user)
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")
    let sequence = data.sequence
    let restockstatus = "P1"
    let restockID = "GR/BMF/RO: " + sequence
    let waybill = new waybillDB({
        restock_id: restockID,
        sequence: sequence,
        location: data.location,
        agentName: data.agentName,
        did: data.did,
        status: restockstatus,
        madeby: data.madeby,
        numbering: data.numbering,
        productBrand: data.productBrand,
        productName: data.productName,
        productCategory: data.productCategory,
        restockQuantity: data.restockQuantity,
        restockDate: date
    })
    waybill.save((err,docs)=> {
        if(err) {
            if (err.name === "MongoServerError" && err.code === 11000){
                console.log(err)
                res.render('error', {
                    title: '11000',
                    code: "11000",
                    response: 'DB Error',
                    message: 'No worries~ database detected duplication entry.',
                    user
                })
            }
            else{
                console.log(err)
                res.render('error', {
                    title: '406',
                    code: "406",
                    response: 'Not Acceptable',
                    message: `Entry didn't meet the requirements.`,
                    user
                })
            }
        }
       else{
        console.log(user)
        res.render('Success', {
            title: 'Success',
            code: '200',
            response: 'Success Creating Restock Order',
            message: 'All green',
            user
        })
       }
    })
}

const insertPickup = (req,res)=> {
    let sessionuser = req.session.user
    let user = sessionuser
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")
    let sequence = data.sequence
    let pickupstatus = "P1"
    let pickupID = "GR/LOC/PO: " + sequence
    let pickupDB = new pickupDB({
        pickup_id: pickupID,
        sequence: sequence,
        location: data.location,
        agentName: data.agentName,
        did: data.did,
        status: pickupstatus,
        madeby: data.madeby,
        numbering: data.numbering,
        serviceType: data.serviceType,
        customerName: data.name,
        customerAddress: data.address,
        customerContact: data.customerContact,
        pickupQuantity: data.quantity,
        itemValue: data.value,
        pickupDate: date
    })
    pickupDB.save((err,docs)=> {
        if(err) {
            if (err.name === "MongoServerError" && err.code === 11000){
                console.log(err)
                res.render('error', {
                    title: '11000',
                    code: "11000",
                    response: 'DB Error',
                    message: 'No worries~ database detected duplication entry.',
                    user
                })
            }
            else{
                console.log(err)
                res.render('error', {
                    title: 'Error',
                    code: "406",
                    response: 'Not Acceptable',
                    message: `Entry didn't meet the requirements.`,
                    user
                })
            }
        }
       else{
            res.render('Success', {
                title: 'Success',
                code: '200',
                response: 'Success Creating Restock Order',
                message: 'All green',
                user
            })
       }
    })
}

module.exports= {
    insertRestock,
    insertPickup,
}
