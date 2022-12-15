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
const stockDB = require('../models/stocks')
const pickupDB = require ('../models/pickup')
const userDB = require('../models/user')
const agentDB = require('../models/agent')
let moment = require('moment')
const { currentUser } = require('../controller/user')


const dashboard = (req,res) =>{
    //let id = req.params.user
    console.log(currentUser[0])
    let user = currentUser[0]
    warehouseDB.aggregate([{ 
        $group:{
            _id: {service: '$service', currentStatus: '$currentStatus', areaCode: '$areaCode'},
            count: { $sum:{$cond: {if: {$gt: ["$currentStatus", null]}, then: 1, else: 0}}}
        }
        }]).then(
        (result)=>{
            console.log(result)
            res.status(200).render('dashboard', {
                title: 'Dashboard',
                user,
                result,
            })
        },
        (err)=>{
            console.log("Error on POD:" + err) 
        }
    )
}

const service = (req,res) =>{
    let services = req.params.services
    let service = services.toUpperCase()
    let user = currentUser[0]
    console.log(service)
    if(services == 'moh'){
        mohPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                //console.log(result[0].podsequence)
                agentDB.find().then(
                    (document)=> {
                        console.log(document)
                        if(result.length == 0){
                            let sequence = 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/moh'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                        else{
                            let sequence = parseInt(result[0].podsequence) + 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/moh'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                    },
                    (err)=> {
                        console.log("Failed to get agent list: " + err)
                    }
                )
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'jpmc'){
        jpmcPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                agentDB.find().then(
                    (document)=> {
                        console.log(document)
                        if(result.length == 0){
                            let sequence = 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/jpmc'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                        else{
                            let sequence = parseInt(result[0].podsequence) + 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/jpmc'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                    },
                    (err)=> {
                        console.log("Failed to get agent list: " + err)
                    }
                )
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'panaga'){
        panagaPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                agentDB.find().then(
                    (document)=> {
                        console.log(document)
                        if(result.length == 0){
                            let sequence = 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/panaga'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                        else{
                            let sequence = parseInt(result[0].podsequence) + 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/panaga'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                    },
                    (err)=> {
                        console.log("Failed to get agent list: " + err)
                    }
                )
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'fmx'){
        fmxPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                agentDB.find().then(
                    (document)=> {
                        console.log(document)
                        if(result.length == 0){
                            let sequence = 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/fmx'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                        else{
                            let sequence = parseInt(result[0].podsequence) + 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/fmx'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                    },
                    (err)=> {
                        console.log("Failed to get agent list: " + err)
                    }
                )
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'zalora'){
        zaloraPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                agentDB.find().then(
                    (document)=> {
                        console.log(document)
                        if(result.length == 0){
                            let sequence = 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/zalora'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                        else{
                            let sequence = parseInt(result[0].podsequence) + 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/zalora'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                    },
                    (err)=> {
                        console.log("Failed to get agent list: " + err)
                    }
                )
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'grp'){
        grpPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                agentDB.find().then(
                    (document)=> {
                        console.log(document)
                        if(result.length == 0){
                            let sequence = 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/grp'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                        else{
                            let sequence = parseInt(result[0].podsequence) + 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/grp'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                    },
                    (err)=> {
                        console.log("Failed to get agent list: " + err)
                    }
                )
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'runner'){
        runnerPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                agentDB.find().then(
                    (document)=> {
                        console.log(document)
                        if(result.length == 0){
                            let sequence = 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/runner'),
                                service: service + ' SERVICES',
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                        else{
                            let sequence = parseInt(result[0].podsequence) + 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/runner'),
                                service: service + ' SERVICES',
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                    },
                    (err)=> {
                        console.log("Failed to get agent list: " + err)
                    }
                )
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'personal'){
        personalPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                agentDB.find().then(
                    (document)=> {
                        console.log(document)
                        if(result.length == 0){
                            let sequence = 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/personal'),
                                service: service + ' SHOPPING',
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                        else{
                            let sequence = parseInt(result[0].podsequence) + 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/personal'),
                                service: service + ' SHOPPING',
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                    },
                    (err)=> {
                        console.log("Failed to get agent list: " + err)
                    }
                )
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'local'){
        localPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                agentDB.find().then(
                    (document)=> {
                        console.log(document)
                        if(result.length == 0){
                            let sequence = 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/local'),
                                service: service + ' DELIVERY',
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                        else{
                            let sequence = parseInt(result[0].podsequence) + 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/local'),
                                service: service + ' DELIVERY',
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                    },
                    (err)=> {
                        console.log("Failed to get agent list: " + err)
                    }
                )
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'tmx'){
        tmxPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                agentDB.find().then(
                    (document)=> {
                        console.log(document)
                        if(result.length == 0){
                            let sequence = 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/tmx'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                        else{
                            let sequence = parseInt(result[0].podsequence) + 1
                            res.render('pod',{
                                title: `${service} POD`,
                                partials: ('./partials/pod/tmx'),
                                service: service,
                                sequence: sequence,
                                moment: moment,
                                user,
                                document
                            })
                        }
                    },
                    (err)=> {
                        console.log("Failed to get agent list: " + err)
                    }
                )
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else{
        console.log('Error 404 - page not found')
        res.render('error', {
            title: '404',
            response: '',
            message: 'Page not found'
        })
    }
}

const self = (req,res) =>{
    let user = currentUser[0]
    console.log(user.uid)
    res.render('selfcollect',{
        title: "Self Collect",
        partials: './partials/selfcollect/selfcollect.ejs',
        moment,
        user
    })
}

const instock = (req,res) =>{
    let user = currentUser[0]
    stockDB.find().sort({$natural: -1}).limit(1).then(
        (result)=>{
            console.log(result)
            //console.log(result[0].sequence)
            if(result.length == 0){
                let sequence = 1
                res.render('itemin', {
                    title: "Item In",
                    partials: './partials/itemin/newinventory.ejs',
                    moment: moment,
                    sequence: sequence,
                    user,
                })
            }
            else{
                let sequence = parseInt(result[0].sequence) + 1 
                console.log(sequence)
                res.render('itemin', {
                    title: "Item In",
                    partials: './partials/itemin/newinventory.ejs',
                    moment: moment,
                    sequence: sequence,
                    user,
                })
            }
        },
        (err)=>{
            console.log(err)
        }
    )
}

const inventoryList = (req,res) =>{
    stockDB.find().then(
        (result)=>{
            console.log(result)
            res.render('list', {
                title: "Inventory",
                partials: './partials/list/inventory.ejs',
                moment: moment, 
                list: result,
            })
        },
        (err)=>{

        }
    )
}

const serviceIn = (req,res)=> {
    let services = req.params.services
    let user = currentUser[0]
    console.log(services)
    if(services == 'moh'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/moh'),
            moment: moment,
            user
        })
    }
    else if(services == 'jpmc'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/jpmc'),
            moment: moment,
            user
        })
    }
    else if(services == 'panaga'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/panaga'),
            moment: moment,
            user
        })
    }
    else if(services == 'fmx'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/fmx'),
            moment: moment,
            user
        })
    }
    else if(services == 'zalora'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/zalora'),
            moment: moment,
            user
        })
    }else if(services == 'grp'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/grp'),
            moment: moment,
            user
        })
    }
    else if(services == 'runner'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/runner'),
            moment: moment,
            user
        })
    }
    else if(services == 'personal'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/personal'),
            moment: moment,
            user
        })
    }
    else if(services == 'local'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/local'),
            moment: moment,
            user
        })
    }
    else if(services == 'tmx'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/tmx'),
            moment: moment,
            user
        })
    }
    else{
        console.log('Error 404 - page not found')
        res.render('error', {
            title: '404',
            response: '',
            message: 'Page not found'
        })
    }
}

const itemList = (req,res) =>{
    let services = req.params.services
    let user = currentUser[0]
    console.log(services)
    warehouseDB.find().then(
        (documents)=>{
            console.log(documents)
            if(services == 'moh' && documents[0].service == 'MOH'){
                console.log(documents[0])
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/moh'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }
            else if(services == 'jpmc' && documents[0].service == 'JPMC'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/jpmc'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }
            else if(services == 'panaga' && documents[0].service == 'PANAGA'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/panaga'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }
            else if(services == 'fmx' && documents[0].service == 'FMX'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/fmx'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }
            else if(services == 'zalora' && documents[0].service == 'ZALORA'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/zalora'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }else if(services == 'grp' && documents[0].service == 'GRP'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/grp'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }
            else if(services == 'runner' && documents[0].service == 'RUNNER'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/runner'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }
            else if(services == 'personal' && documents[0].service == 'PERSONAL'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/personal'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }
            else if(services == 'local' && documents[0].service == 'LOCAL'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/local'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }
            else{
                console.log('Error 404 - page not found')
                res.render('error', {
                    title: '404',
                    response: '',
                    message: 'Page not found'
                })
            }
        },
        (err)=>{
            console.log(err)
            console.log('Error 404 - page not found')
                res.render('error', {
                    title: '404',
                    response: '',
                    message: 'Page not found'
                })
        }
    )
}

const podList = (req,res)=> {
    let services = req.params.services
    let servicecode = req.params.servicecode
    let user = currentUser[0]
    let service = services.toUpperCase()
    console.log(service)
    if(services == 'moh'){
        mohPodDB.find().sort().then(
            (document)=>{
                console.log(document)
                res.render('podlist',{
                    title: `${service} POD List`,
                    partials: ('./partials/podlist/moh'),
                    moment: moment,
                    document,
                    user
                })
            },
            (err)=>{
                console.log(err)
            }
        )
    }
    else if(services == 'jpmc'){
        jpmcPodDB.find().sort().then(
            (document)=>{
                if (document == []){
                    res.render('error', {
                        title: '404',
                        response: '',
                        message: 'Page not found'
                    })
                }
                else{
                    res.render('podlist',{
                        title: `${service} POD List`,
                        partials: ('./partials/podlist/jpmc'),
                        moment: moment,
                        document,
                        user
                    })
                }
            },
            (err)=>{
                console.log(err)
            }
        )
    }
    else if(services == 'panaga'){
        panagaPodDB.find().sort().then(
            (document)=>{
                res.render('podlist',{
                    title: `${service} POD List`,
                    partials: ('./partials/podlist/panaga'),
                    moment: moment,
                    document,
                    user
                })
            },
            (err)=>{
                console.log(err)
            }
        )
    }
    else if(services == 'fmx'){
        fmxPodDB.find().sort().then(
            (document)=>{
                res.render('podlist',{
                    title: `${service} POD List`,
                    partials: ('./partials/podlist/fmx'),
                    moment: moment,
                    document,
                    user
                })
            },
            (err)=>{
                console.log(err)
            }
        )
    }
    else if(services == 'zalora'){
        zaloraPodDB.find().sort().then(
            (document)=>{
                res.render('podlist',{
                    title: `${service} POD List`,
                    partials: ('./partials/podlist/zalora'),
                    moment: moment,
                    document,
                    user
                })
            },
            (err)=>{
                console.log(err)
            }
        )
    }
    else if(services == 'grp'){
        grpPodDB.find().sort().then(
            (document)=>{
                res.render('podlist',{
                    title: `${service} POD List`,
                    partials: ('./partials/podlist/grp'),
                    moment: moment,
                    document,
                    user
                })
            },
            (err)=>{
                console.log(err)
            }
        )
    }
    else if(services == 'runner'){
        runnerPodDB.find().sort().then(
            (document)=>{
                res.render('podlist',{
                    title: `${service} POD List`,
                    partials: ('./partials/podlist/runner'),
                    moment: moment,
                    document,
                    user
                })
            },
            (err)=>{
                console.log(err)
            }
        )
    }
    else if(services == 'personal'){
        personalPodDB.find().sort().then(
            (document)=>{
                res.render('podlist',{
                    title: `${service} POD List`,
                    partials: ('./partials/podlist/personal'),
                    moment: moment,
                    document,
                    user
                })
            },
            (err)=>{
                console.log(err)
            }
        )
    }
    else if(services == 'tmx'){
        personalPodDB.find().sort().then(
            (document)=>{
                res.render('podlist',{
                    title: `${service} POD List`,
                    partials: ('./partials/podlist/tmx'),
                    moment: moment,
                    document,
                    user
                })
            },
            (err)=>{
                console.log(err)
            }
        )
    }
    else if(services == 'local'){
        personalPodDB.find().sort().then(
            (document)=>{
                res.render('podlist',{
                    title: `${service} POD List`,
                    partials: ('./partials/podlist/local'),
                    moment: moment,
                    document,
                    user
                })
            },
            (err)=>{
                console.log(err)
            }
        )
    }
    else{
        console.log('Error 404 - page not found')
        res.render('error', {
            title: '404',
            response: '',
            message: 'Page not found'
        })
    }
}

const restockForm = (req,res)=> {
    let user = currentUser[0]
    waybillDB.find().sort({$natural: -1}).limit(1).then(
        (result)=>{
            console.log(result)
            if(result.length == 0){
                let sequence = 1
                //console.log(result.sequence)
                res.render('restock',{
                    title: `BMF WAYBILL`,
                    sequence: sequence,
                    moment: moment,
                    user
                })
            }
            else{
                let sequence = result.sequence + 1
                console.log(result.sequence)
                res.render('restock',{
                    title: `BMF WAYBILL`,
                    sequence: sequence,
                    moment: moment,
                    user
                })
            }
        },
        (err)=>{
            console.log("Failed to append sequence: " + err)
            res.render('error', {
                title: '404',
                response: '',
                message: 'Page not found'
            })
        }
    )
}

const exportForm = (req,res) =>{
    let user = currentUser[0]
    res.render('export', {
        title: "Export Inventory",
        partials: './partials/export/entryexport.ejs',
        moment: moment,
        user
    })
}

const financeForm = (req,res)=>{
    let user = currentUser[0]
    console.log(user)
    res.render('export', {
        title: "POD Summary",
        partials: './partials/export/finance.ejs',
        moment: moment,
        user
    })
}

const pickupForm = (req,res)=> {
    let user = currentUser[0]
    pickupDB.find().sort({$natural: -1}).limit(1).then(
        (result)=>{
            console.log(result.sequence)
            if(result.length == 0){
                let sequence = 1
                console.log("IF: "+ sequence)
                res.render('pickup',{
                    title: "Pickup Order",
                    moment: moment,
                    sequence,
                    user
                })
            }
            else{
                let sequence = parseInt(result.sequence) + 1
                console.log("ELSE: "+ sequence)
                res.render('pickup',{
                    title: "Pickup Order",
                    moment: moment,
                    sequence,
                    user
                })
            }
        },
        (err)=>{

        }
    )
}

const register = (req,res)=> {
    let user = currentUser[0]
    res.render('user', {
        title: "New User",
        partials: './partials/user/register.ejs',
        moment: moment,
        user
    })
}

const passwordChange = (req,res)=> {
    res.render('login', {
        title: "Change Password",
        partials: './partials/user/changePassword.ejs',
        moment: moment,
    })
}

const passwordForgot = (req,res)=> {
    res.render('login', {
        title: "Forgot Password",
        partials: './partials/user/forgotPassword.ejs',
        moment: moment,
    })
}

const driversRegister = (req,res)=> {
    let user = currentUser[0]
    res.render('user', {
        title: 'new agent',
        partials: './partials/user/newagent.ejs',
        moment,
        user
    })
}

const logout = (req,res)=> {
    let session = req.session
    session.destroy((err)=>{
        if (err) return res.sendStatus(400)
        res.render('login', {
            title: 'login',
            moment: moment
        })
        console.log('session destroy')
    })
}

const login = (req,res)=> {
    res.render('login', {
        title: "Login",
        partials: './partials/user/login.ejs',
        moment: moment,
    })
}

const miscPage = (req,res)=> {
    let user = currentUser[0]
    res.render('itemin', {
        title: "Miscellaneous",
        partials: "./partials/itemin/misc.ejs",
        moment: moment,
        user
    })
}

const wellousPage = (req,res)=> {
    let user = currentUser[0]
    res.render('itemin', {
        title: "Wellous",
        partials: "./partials/itemin/wellous.ejs",
        moment: moment,
        user
    })
}

module.exports = {
    dashboard,
    service,
    self,
    instock,
    inventoryList,
    serviceIn,
    itemList,
    podList,
    restockForm,
    exportForm,
    financeForm,
    pickupForm,
    register,
    passwordChange,
    passwordForgot,
    driversRegister,
    logout,
    login,
    miscPage,
    wellousPage
}