const grmyDB = require('../models/grmy')
const moment = require('moment')

const insertGrmy = ((req,res) => {
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
    let grmy = new grmyDB ({
        trackingNumber: tracker,
        name: data.name,
        contact: data.contact,
        address: data.address,
        area: data.area,
        areaIndicator: data.areaLoc,
        task: data.taskCB,
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
    grmy.history.push(parcelStatus)
    grmy.save(err=>{
        if (err) {
            console.log (err)
            res.render('error', {
                error: "404",
                message: "Not Found"
            })
        }
        else{
            console.log('Status: 201 - success entry to database')
            res.status(201)
            res.redirect('', {
                userName: currentUser.name,
                position: currentUser.position,
            })
        }
    })
})

const readGrmy = ((req,res) => {
    let id = req.params._id
    grmyDB
        .find()
        .sort({entryDate: -1})
        .lean()
        .exec((err,data)=>{
            if (err) {
                console.log(err)
                res.render('error', {

                })
            }
            else {
                grmyDB
                    .find()
                    .count()
                    .exec(function(err,count){
                        if (err) {
                            console.log(err)
                            res.render('error', {

                            })
                        }
                        else {
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
                    })
            }
        })
})

const updateGrmy = ((req,res) => {

})

module.exports = {
    insertGrmy,
    readGrmy,
    updateGrmy,
}