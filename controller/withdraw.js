const warehouseDB = require('../models/warehouseInventory')
const stockDB = require('../models/stocks')
const moment = require('moment')

//One for all
const itemWithdraw = ((req,res)=> {
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
    warehouseDB.findOne(tracker, (err,result) => {
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
    warehouseDB.findOneAndUpdate(tracker,update,option,(err,docs) => {
        if(err){
            console.log(err)
            console.log(`${tracker} failed to be updated.`)
            res.flash('error', `Failed to update ${tracker}`)
            res.redirect('/:service-out',{
                name: currentUser.name,
                icNumber: currentUser.icNumber,
            })
        } 
        else {
            console.log('update success')
            //let date = req.body.dateSchedule
            res.status(201).send()
            res.flash('success', `${tracker} has been updated.`)
            res.redirect('/:service-out',{
                name: currentUser.name,
                icNumber: currentUser.icNumber,
            })
        } 
    })
})

const selfCollect = ((req,res) =>{
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")
    let filter = data.trackingNumber
    let option = {upsert: false, new: false}
    let update = {
        currentStatus: "D2",
        lastUpdate: date,
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
            res.flash('error', `${tracker} failed to update to DB.`)
            res.redirect('/self-collect')
        }
        else {
            console.log(result)
            res.flash('success', `${tracker} has been updated.`)
            res.redirect('/self-collect')
        }
    })
})

const reentry = ((req,res) =>{
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")
    let filter = data.trackingNumber
    let option = {upsert: false, new: false}
    let update = {
        currentStatus: "A3",
        lastUpdate: date,
        $push:{
            history: {
                statusDetail: "A3", 
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
            res.flash('error', `${tracker} failed to update to DB.`)
            res.redirect('/re-entry')
        }
        else {
            console.log(result)
            res.flash('success', `${tracker} has been updated.`)
            res.redirect('/re-entry')
        }
    })
})

const inventoryOutUpdate = (req,res)=> {
    let data = req.body
    let date =  moment().format("DD/MM/YYYY")
    for(i=0; i<= data.numbers.length; i++){

    }
    let filter = data.product_id
    let option = {upsert: false, new: false}
    let update = {
        productQuantity: data.productQuantity,
        
    }
    console.log(filter)
    warehouseDB.findOneAndUpdate(filter, update, option, (err,result) => {
        if(err){
            console.log(err)
            res.flash('error', `${tracker} failed to update to DB.`)
            res.redirect('/re-entry')
        }
        else {
            console.log(result)
            res.flash('success', `${tracker} has been updated.`)
            res.redirect('/re-entry')
        }
    })
}

module.exports = {
    itemWithdraw,
    selfCollect,
    reentry
}