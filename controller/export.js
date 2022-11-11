const warehouseDB = require('../models/warehouseInventory')
const moment = require('moment')

const exportInventory = (req,res) =>{
    let data = req.body
    console.log(data)
    let services = data.service
    let status = data.currentStatus
    let end = moment(data.enddate).format('DD/MM/YYYY')
    let start = moment(data.startdate).format('DD/MM/YYYY')
    let service
    let currentStatus
    if (services == "*"){
        service = {$in: ["MOH","JPMC","PANAGA","FMX","LOCAL","RUNNER","PERSONAL","TMX","ZALORA","GRP"]}
    }
    else{
        service = data.service.toUpperCase()
    }
    if (status == "*"){
        currentStatus = {$in: ["A1","A2","A3","B","C","D1","D2","D3","X"]}
    }
    else{
        currentStatus = data.currentStatus
    }
    console.log(end)
    console.log(start)
    let filter = {
        $gte: {dateEntry: data.start},
        $lte: {dateEntry: data.end},
        $or: [{service: service,currentStatus: currentStatus}]
    }
    warehouseDB.find(filter).sort({trackingNumber: 1}).then(
        (result)=>{
            console.log('Successfully extracted required data.')
            console.log(result)
            res.render('list', {
                title: 'Extraction Error',
                partials: './partials/list/export',
                list: result,
            })
        },
        (err)=>{
            console.log('Failed to extract required data.')
            console.log(err)
            res.render('error', {
                title: 'Extraction Error',
                error_code: '',
                response: '',
                message: ''
            })
        }
    )
}

module.exports = {
    exportInventory,
}