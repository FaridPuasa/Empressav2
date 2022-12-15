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
const wellousDB = require('../models/wellous')
const stockDB = require('../models/stocks')
const waybillDB = require('../models/restock')
const moment = require('moment')
const { currentUser } = require('../controller/user')

const exportInventory = (req,res) =>{
    let data = req.body
    console.log(data)
    let services = data.service
    let status = data.currentStatus
    let end = moment(data.enddate).format('DD/MM/YYYY')
    let start = moment(data.startdate).format('DD/MM/YYYY')
    let user = currentUser[0]
    let service
    let currentStatus
    if (services == "*"){
        service = {$in: ["MOH","JPMC","PANAGA","FMX","LOCAL","RUNNER","PERSONAL","TMX","ZALORA","GRP"]}
    }
    else{
        service = {$all: [data.service.toUpperCase()]}
    }
    if (status == "*"){
        currentStatus = {$in: ["A1","A2","A3","B","C","D1","D2","D3","D4"]}
    }
    else{
        currentStatus = {$all: [data.currentStatus]}
    }
    console.log(end)
    console.log(start)
    let filter = {
        $and: [
            {
                dateEntry: {
                    $gte: start,
                    $lte: end
                }, 
                service: service,
                currentStatus: currentStatus
            }
        ]
    }
    warehouseDB.find(filter).sort({trackingNumber: 1}).then(
        (result)=>{
            console.log('Successfully extracted required data.')
            console.log(result)
            res.render('list', {
                title: 'Extraction Success',
                partials: './partials/list/export',
                list: result,
                user
            })
        },
        (err)=>{
            console.log('Failed to extract required data.')
            console.log(err)
            res.render('error', {
                title: 'Extraction Error',
                error_code: '',
                response: '',
                message: '',
                user
            })
        }
    )
}

const exportPodSummary = (req,res) =>{
    let data = req.body
    let services = data.service
    let status = data.currentStatus
    let end = data.enddate
    let start = data.startdate
    let service = services.toUpperCase()
    let user = currentUser[0]
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
        deliveryDate: {
            $gte: start, 
            $lte: end
        } 
    }
    console.log(filter)
    database.find(filter).then(
        (result)=>{
            console.log('Successfully extracted required data.')
            console.log(result[0])
            
            res.render('finance', {
                title: 'Finance Summary',
                partials: './partials/export/financebyservice.ejs',
                service,
                result,
                user
            })
        },
        (err)=>{
            console.log('Failed to extract required data.')
            console.log(err)
            res.render('error', {
                title: 'Extraction Error',
                error_code: '',
                response: '',
                message: '',
                user
            })
        }
    )
}

module.exports = {
    exportInventory,
    exportPodSummary,
}