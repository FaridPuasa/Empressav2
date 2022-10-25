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

let getPod = (req,res)=>{
    podDB.find().sort({$natural: -1}).limit(1).next().then(
        (result)=>{
            console.log(result.seq)
            let seq = result.seq + 1
            res.render('pod',{
                title: "Proof of Delivery",
                moment: moment,
                seq: seq,
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