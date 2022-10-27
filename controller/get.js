const zaloraDB = require('../models/zaloras')
const pharmacyDB = require('../models/pharmacies')
const grpDB = require('../models/grps')
const runnerDB = require('../models/runners')
const personalDB = require('../models/personals')
const miscDB = require('../models/miscs')
const fmxDB = require('../models/fmxs')
const stockDB = require('../models/stocks')
const podDB = require('../models/pods')
const moment = require('moment')

let getDashboard = (req,res)=>{
    let warehouse = {status: "IN WAREHOUSE"}
    let medRoom = {status: "IN MEDICINE ROOM"}
    let delivery = {status: "DELIVERY IN PROGRESS"}
    /*fmxDB.countDocuments({areaCode: "A", warehouse}, (err,count_A)=>{
        if (err) return console.log("Failed to retrive count for Area: Berakas 1 | FMX")
        
    })*/
    fmxDB.aggregate({
        $group: {
            _id: {area: '$area', status: '$status'},
            countFMX: {$sum: 1}
        }
    })
    res.render('dashboard', {
        title: "Dashboard",
        moment: moment,
        count_FMX: countFMX,
    })
}

let getInsertMoh = (req,res)=>{
    res.render('iteminPharmacy',{
        title: 'Item In',
        moment: moment,
        service: service,
    })
}

let getItemList = (req,res)=>{
    fmxDB.find().sort({$natural: -1}).next().then(
        result =>{
            console.log('All data retrieved')
            res.render()
        }
    )
}


let getPodGeneral = (req,res)=>{
    let service = req.param.service
    podDB.find().sort({$natural: -1}).limit(1).next().then(
        (result)=>{
            console.log(result.seq)
            let seq = result.seq + 1
            res.render('podGeneral',{
                title: "Proof of Delivery",
                moment: moment,
                seq: seq,
                service: service,
            })
        },
        (err)=>{
            console.log("Error on POD:" + err)
        }
    )
}

let getPodPharmacy= (req,res)=>{
    let service = req.params.service
    podDB.find().sort({$natural: -1}).limit(1).next().then(
        (result)=>{
            console.log(result.seq)
            let seq = result.seq + 1
            res.render('pod',{
                title: "Proof of Delivery",
                moment: moment,
                seq: seq,
                service: service
            })
        },
        (err)=>{
            console.log("Error on POD:" + err)
        }
    )
}

let getRestockOrder = (req,res)=>{
    restockDB.find().sort({$natural: -1}).limit(1).next().then(
        (result)=>{
            console.log(result.seq)
            let seq = result.seq + 1
            res.render('restock',{
                title: "Restock Order",
                moment: moment,
                seq: seq,
            })
        },
        (err)=>{
            console.log("Error on Restock:" + err)
        }
    )
}

module.exports = {
    getDashboard,
    getPodGeneral,
    getPodPharmacy,
}