const mohPodDB = require ('../models/mohpod')
const jpmcPodDB = require('../models/jpmcpod')
const panagaPodDB = require('../models/panagapod')
const zaloraPodDB = require('../models/zalorapod')
const localPodDB = require('../models/localpod')
const tmxPodDB = require('../models/tmxpod')
const fmxPodDB = require('../models/fmxpod')
const grpPodDB = require('../models/grppod')
const runnerPodDB = require('../models/runnerpod')
const personalPodDB = require('../models/personalpod')
const warehouseDB = require('../models/warehouseInventory')
const waybillDB = require('../models/restock')
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
        currentStatus = {$in: ["A1","A2","A3","B","C","D1","D2","D3","D4"]}
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

const exportPodSummary = (req,res) =>{
    let data = req.body
    console.log(data)
    let services = data.service
    let status = data.currentStatus
    let end = moment(data.enddate).format('DD/MM/YYYY')
    let start = moment(data.startdate).format('DD/MM/YYYY')
    let service = services.toUpperCase()
    let currentStatus
    let database

    console.log(data)

    if(services == "moh"){
        database = mohPodDB
    }

    if(services == "jpmc"){
        database = jpmcPodDB
    }

    if(services == "panaga"){
        database = panagaPodDB
    }

    if(services == "local"){
        database = localPodDB
    }

    if(services == "tmx"){
        database = tmxPodDB
    }

    if(services == "fmx"){
        database = fmxPodDB
    }

    if(services == "grp"){
        database = grpPodDB
    }

    if(services == "runner"){
        database = runnerPodDB
    }

    if(services == "personal"){
        database = personalPodDB
    }

    if(services == "zalora"){
        database = zaloraPodDB
    }

    console.log("Finance Summary For: " + database)
    
    if (status == "*"){
        currentStatus = {$in: ["A1","A2","A3","B","C","D1","D2","D3","D4"]}
    }
    else{
        currentStatus = data.currentStatus
    }
    console.log(end)
    console.log(start)
    let filter = {
        $gte: {dateEntry: data.start},
        $lte: {dateEntry: data.end},
    }
    database.find(filter).sort({trackingNumber: 1}).then(
        (result)=>{
            console.log('Successfully extracted required data.')
            console.log(result)
            res.render('finance', {
                title: 'Finance Summary',
                partials: './partials/export/exportlist.ejs',
                service,
                result,
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
    exportPodSummary,
}