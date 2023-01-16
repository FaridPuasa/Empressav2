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

const xxx = (req,res) =>{
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
                partials: './partials/export/reconService.ejs',
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

const exportFinanceSummary = (req,res) =>{
    let data = req.body
    let service = data.service
    let end = moment(data.enddate, "YYYY-MM-DD").format("DD/MM/YYYY")
    let start = moment(data.startdate, "YYYY-MM-DD").format("DD/MM/YYYY") 
    let user = currentUser[0]
    console.log(data)
    let filter = {
        deliveryDate: {
            $gte: start, 
            $lte: end
        } 
    }
    console.log(filter)
    warehouseDB.find(filter).then(
        (result)=>{
            console.log('Successfully extracted required data.')
            console.log(result)
            res.render('finance', {
                service,
                title: 'Finance Summary',
                partials: './partials/export/reconService.ejs',
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

const exportFinanceSummaryDriver = (req,res) =>{
    let data = req.body
    let end = data.enddate
    let start = data.startdate
    let user = currentUser[0]
    console.log(data)
    let filter = {
        deliveryDate: {
            $gte: start, 
            $lte: end
        } 
    }
    console.log(filter)
    warehouseDB.find(filter).then(
        (result)=>{
            console.log('Successfully extracted required data.')
            console.log(result[0])
            res.render('finance', {
                title: 'Finance Summary',
                partials: './partials/export/reconDrivers.ejs',
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

const reconService = (req,res)=> {
    let date = moment().format("DD/MM/YYYY")
    let data = req.body
    for (let i = 0; i < data.trackingNumber.length; i++){
        let ps = data.paymentStatus[i]
        let update
        console.log (ps)
        if(ps === "on"){
            ps = "T"
            console.log(ps)
            update = {
                paymentStatus: ps,
                ackCode: data.ackCode[i]
            }
        }
        let filter = {trackingNumber: data.trackingNumber[i]}
        let option = {upsert: false, new: false}
        console.log(filter)
        console.log(update)
        warehouseDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
            if (err){
                //console.log(`Failed update: ${trackingNumber}`)
               //req.flash('error', `Failed to update: ${trackingNumber}`)
            }
            else{
                console.log(`Successfully update: `)
                //req.flash('success', `${trackingNumber} has been updated on the database.`)
                //res.status(201).send()
            }
        })
    }
}

const reconDriver = (req,res)=> {
    let date = moment().format("DD/MM/YYYY, h:mm:ss a")
    let data = req.body
    for (let i = 0; i < data.trackingNumber.length; i++){
        let ps = data.paymentStatus[i]
        let update
        console.log (ps)
        if(ps === "on"){
            ps = "T"
            console.log(ps)
            update = {
                paymentStatus: ps,
                ackCode: data.ackCode[i]
            }
        }
        if(ps != "on" || ps == undefined || ps == "undefined" || ps == void(0)){
            ps = "F"
            update = {
                paymentStatus: ps,
                ackCode: data.ackCode[i]
            }
        }
        let filter = {trackingNumber: data.trackingNumber[i]}
        let option = {upsert: false, new: false}
        console.log(filter)
        console.log(update)
        warehouseDB.findOneAndUpdate(filter,update,option,(err,docs)=>{
            if (err){
                //console.log(`Failed update: ${trackingNumber}`)
               //req.flash('error', `Failed to update: ${trackingNumber}`)
            }
            else{
                console.log(`Successfully update: ${trackingNumber[i]}`)
                //req.flash('success', `${trackingNumber} has been updated on the database.`)
                //res.status(201).send()
            }
        })
    }
}

const easyinvoice = require ('easyinvoice')
const fs = require ('fs')

const axios = require('axios')

const receiptGenerator = (req,res)=>{
    let fileName = `${Date.now()}.pdf`
    let date = moment().format('DD MMM YY')
    let time = moment().format('LT')
    let year = moment().format('YY')
    let trackingNumber = req.body.tracker
    let filter = {trackingNumber}
    console.log(filter)
    warehouseDB.find(filter).then(
        (result)=>{
            console.log(result)
            let docs = result[0]
            let service 
            if(docs.service == "MOH"){
                service = "Pharmacy Services (MOH)"
            }
            if(docs.service == "JPMC"){
                service = "Pharmacy Services (JPMC / PJSC)"
            }
            if(docs.service == "PANAGA"){
                service = "Pharmacy Services (PANAGA)"
            }
            if(docs.service == "FMX"){
                service = "Last Mile Delivery (FMX)"
            }
            if(docs.service == "TMX"){
                service = "Fullfillment Services (Thermomix)"
            }
            if(docs.service == "RUNNER"){
                service = "Runner Services (Go Beli Store)"
            }
            if(docs.service == "PERSONAL"){
                service = "Personal Shopping (Go Beli Store)"
            }
            if(docs.service == "LOCAL"){
                service = "Last Mile Delivery (Local Deliveries)"
            }
            if(docs.service == "ZALORA"){
                service = "Last Mile Delivery (Zalora)"
            }
            if(docs.service == "GRP"){
                service = "Fullfillment (Go Rush Plus)"
            }

            let count = fs.readdirSync('./receipt').length
            console.log(count)
            if(count >= 0 && count <= 9){
                count = "000" + count
            }
            if(count >= 10 && count <= 99){
                count = "00" + count
            }
            if(count >= 100 && count <= 999){
                count = "0" + count
            }
            if(count >= 1000 && count <= 9999){
                count
            }
            let serialNumbers = "GR:" + year +"/" + count
            //let fileName = `${year}-`
            //let serialNumbers = fileName.toString()
            var data = {
                "customize": {
                    "template": fs.readFileSync('./receipt/index.html', 'base64')
                },
                "images": {
                    "logo": fs.readFileSync('./public/img/mini.png', 'base64')
                },
                "sender": {
                    "company": "Go Rush Express",
                    "address": "Unit 9, Block A, Simpang 188, Jalan Pengiran Babu Raja, Kampong Kiarong.",
                    "zip": "BE1318",
                    "city": "Bandar Seri Begawan",
                    "country": "Brunei Darussalam"
                },
                "client": {
                    "company": docs.contactName,
                    "address": docs.contactAddress,
                    "city": "Bandar Seri Begawan",
                    "country": "Brunei Darussalam",
                    "custom1": docs.contactNumber
                },
                "information": {
                    // Invoice number
                    "number": serialNumbers,
                    // Invoice data
                    "date": date,
                    "due-date": time
                },
                "products": [
                    {
                        "quantity": 1,
                        "description": service,
                        "tax-rate": 0,
                        "price": docs.value
                    }
                ],
                "bottom-notice": "This is auto generated receipt. For any enquiries please contact +673 233 2065.",
                "settings": {
                    "currency": "USD",
                },
                "translate": {
                    "invoice": "OFFICIAL RECEIPT", 
                    "number": "Serial No",
                    "date": "Date",
                    "due-date": "Time",
                },
            };
            console.log(data)
          
            const generate = async()=> {
                try{
                    let result = await easyinvoice.createInvoice(data)
                    fs.writeFileSync(`./receipt/${fileName}`, result.pdf, 'base64');
                }
                catch(e){
                    console.log(e)
                }
            }
            generate()

            let update = {receipt: fileName}
            let option = {upsert: false, new: false}
            warehouseDB.findOneAndUpdate(filter, update, option, (err, docs)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log(docs)
                    console.log("Receipt name added")
                }
            })
            res.send(data)
        },
        (err)=>{
            console.log(err)
            console.log("Failed to generate receipt")
        }
    )
}

let dotenv = require('dotenv').config()
const userid = process.env.WAID
const pass = process.env.WAPASS

const sendReceipt = (req,res)=>{
    let data = req.body
    let tracker = data.trackingNumber
    let filter = {trackingNumber: "451996397"}
    warehouseDB.find(filter).then(
        (result)=>{
            let doc = result[0]
            let phone = doc.contactNumber
            let sendTo = "00" + phone.replaceAll(/\s/g,'')
            let actual = sendTo.replace('+','')
            let receipt = doc.receipt
            console.log(doc)
            console.log(actual)
            const media = `./receipt/${receipt}.pdf`
            const URL = `https://media.smsgupshup.com/GatewayAPI/rest?send_to=${actual}&msg_type=document&userid=${userid}&auth_scheme=plain&password=${pass}&method=SendMediaMessage&v=1.1&media_url=${media}&caption=Hello, This is your receipt. Thank you for using our services.&isHSM=true&isTemplate=true&data_encoding=text&format=json&footer=Go Rush Express`
            
            axios.get(URL). then(
                (response)=>{
                    console.log(response.status) 
                    console.log(response.data)
                    console.log("WhatsApp Template sent!")
                },
                (err)=>{
                    console.log(err)
                }
            )
        },
        (err)=>{
            console.log(err)
            console.log("Failed to send a WhatsApp Template to the receipient")
        }
    )
}

module.exports = {
    exportInventory,
    exportFinanceSummary,
    reconService,
    reconDriver,
    exportFinanceSummaryDriver,
    receiptGenerator,
    sendReceipt
}