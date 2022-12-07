const zaloraDB = require('../models/zaloras')
const pharmacyDB = require('../models/pharmacies')
const grpDB = require('../models/grps')
const runnerDB = require('../models/runners')
const personalDB = require('../models/personals')
const miscDB = require('../models/miscs')
const fmxDB = require('../models/fmxs')
const stockDB = require('../models/stocks')
const moment = require('moment')

const readZalora = ((req,res) =>{
    let id = req.params._id
    let position = currentUser.position
    zaloraDB
        .find()
        .sort({entryDate: -1})
        .lean()
        .count()
        .exec((err,data)=>{
            if (err) return console.log(err)
            else {
                if(position == "AD"){
                    res.status(200)
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
                else if(position == "WH"){
                    res.status(200)
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
            }
        })
})

const readPharmacy = ((req,res) =>{
    let id = req.params._id
    let position = currentUser.position
    pharmacyDB
        .find()
        .sort({entryDate: -1})
        .lean()
        .count()
        .exec((err,data)=>{
            if (err) return console.log(err)
            else {
                if(position == "AD"){
                    res.status(200)
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
                else if(position == "WH"){
                    res.status(200)
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
            }
        })
})

const readGrp = ((req,res) =>{
    let id = req.params._id
    let position = currentUser.position
    grpDB
        .find()
        .sort({entryDate: -1})
        .lean()
        .count()
        .exec((err,data)=>{
            if (err) return console.log(err)
            else {
                if(position == "AD"){
                    res.status(200)
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
                else if(position == "WH"){
                    res.status(200)
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
            }
        })
})

const readRunner = ((req,res) =>{
    let id = req.params._id
    let position = currentUser.position
    runnerDB
        .find()
        .sort({entryDate: -1})
        .lean()
        .count()
        .exec((err,data)=>{
            if (err) return console.log(err)
            else {
                if(position == "AD"){
                    res.status(200)
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
                else if(position == "WH"){
                    res.status(200)
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
            }
        })
})

const readPersonal = ((req,res) =>{
    let id = req.params._id
    let position = currentUser.position
    personalDB
        .find()
        .sort({entryDate: -1})
        .lean()
        .count()
        .exec((err,data)=>{
            if (err) return console.log(err)
            else {
                if(position == "AD"){
                    res.status(200)
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
                else if(position == "WH"){
                    res.status(200)
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
            }
        })
})

const readFmx = ((req,res) =>{
    let id = req.params._id
    let position = currentUser.position
    fmxDB
        .find()
        .sort({entryDate: -1})
        .lean()
        .count()
        .exec((err,data)=>{
            if (err) return console.log(err)
            else {
                if(position == "AD"){
                    res.status(200)
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
                else if(position == "WH"){
                    res.status(200)
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
            }
        })
})

const readStock = ((req,res)=>{
    let id = req.params._id
    let position = currentUser.position
    stockDB
        .find()
        .sort({entryDate: -1})
        .lean()
        .count(product)
        .exec((err,data)=>{
            if (err) return console.log(err)
            else{
                res.status(200)
                res.render(xxx, {
                    stockList: data,
                })
            }
        })
        
})

module.exports = {
    readZalora,
    readPharmacy,
    readGrp,
    readFmx,
    readPersonal,
    readRunner,
    readStock,
}