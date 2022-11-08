//comfigure connect-flash
//https://stackoverflow.com/questions/49906557/how-to-use-connect-flash-with-ejs-in-express-4-x

//notifications
//https://fjolt.com/article/javascript-notification-system-service-workers

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
const jwt = require('jsonwebtoken')
const express = require('express');
const session = require('express-session')
const router = express.Router();
const moment = require('moment')

const { request } = require('http')
//controller user
const {
    insertUser,
    grantAccess,
    updatePassword,
    currentUser
} = require('../controller/user')

const {
    authPage,
    authService
} = require('../controller/authorization')

const {
    insertZalora,
    insertPharmacy,
    insertRunner,
    insertPersonal,
    insertGrp,
    insertFmx,
    insertLocal,
    insertTmx,
    insertStock,
    insertPodFmx,
    insertPodGrp,
    insertPodJpmc,
    insertPodLocal,
    insertPodMoh,
    insertPodPanaga,
    insertPodPersonal,
    insertPodRunner,
    insertPodTmx,
    insertPodZalora
} = require('../controller/insert')

const {updateMohPodStatus} = require('../controller/update')

router.post('/success-POD', updateMohPodStatus)

//GET Login //done
router.get('/', (req,res)=>{
    res.render('login', {
        title: "Login",
        partials: './partials/user/login.ejs',
        moment: moment,
    })
})

router.get('/success', (req,res)=>{
    res.render('success',{
        response: '',
        message: '',
    })
})

//POST Login
router.post('/dashboard', grantAccess)

/*
//GET Dashboard //testing
router.get('/dashboard', (req,res)=>{
    let id = req.params.user
    warehouseDB.aggregate([{
        $group:{
            _id: {service: '$service', currentStatus: '$currentStatus', area: '$area'},
            count: {$sum:1}
        }
    }]).then(
        (result)=>{
            console.log(result)
            res.status(200).render('dashboard', {
                title: 'Dashboard',
                result,
            })
        },
        (err)=>{
            console.log("Error on POD:" + err) 
        }
    )
})*/

router.post('/success-entry', insertZalora)
router.post('/success-entry-pod', insertPodMoh)

//GET Create POD //awaiting syahmi action - authorization required
router.get('/:services-pod', (req,res)=>{
    let services = req.params.services
    let service = services.toUpperCase()
    let user = currentUser[0]
    console.log(service)
    if(services == 'moh'){
        mohPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                console.log(result[0].podsequence)
                if(result[0].podsequence == undefined || 0 || null){
                    let sequence = 1
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/moh'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                        user
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
                        user
                    })
                }
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'jpmc'){
        jpmcPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                if(result.podsequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/jpmc'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
                else{
                    let sequence = result.podsequence + 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/jpmc'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'panaga'){
        panagaPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                if(result.podsequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/panaga'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
                else{
                    let sequence = result.podsequence + 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/panaga'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'fmx'){
        fmxPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                if(result.podsequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/fmx'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
                else{
                    let sequence = result.podsequence + 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/fmx'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'zalora'){
        podDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                if(result.podsequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/zalora'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
                else{
                    let sequence = result.podsequence + 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/zalora'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'grp'){
        grpPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                if(result.podsequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/grp'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
                else{
                    let sequence = result.podsequence + 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/grp'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'runner'){
        runnerPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                if(result.podsequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/runner'),
                        service: service + ' SERVICES',
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
                else{
                    let sequence = result.podsequence + 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/runner'),
                        service: service + ' SERVICES',
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'personal'){
        personalPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                if(result.podsequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/personal'),
                        service: service  + ' SHOPPING',
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
                else{
                    let sequence = result.podsequence + 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/personal'),
                        service: service + ' SHOPPING',
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'local'){
        localPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                if(result.podsequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/personal'),
                        service: service  + ' SHOPPING',
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
                else{
                    let sequence = result.podsequence + 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/personal'),
                        service: service + ' SHOPPING',
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
            },
            (err)=>{
                console.log("Failed to append sequence: " + err)
            }
        )
    }
    else if(services == 'tmx'){
        tmxPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                if(result.podsequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/personal'),
                        service: service  + ' SHOPPING',
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
                else{
                    let sequence = result.podsequence + 1
                    console.log(result.podsequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/personal'),
                        service: service + ' SHOPPING',
                        sequence: sequence,
                        moment: moment,
                        user
                    })
                }
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
})

//GET Item In //awaiting syahmi action
router.get('/:services-in', (req,res)=>{
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
})

//let currentUser = user

//GET Item List //adding database into the loop
router.get('/:services-list', (req,res)=>{
    let services = req.params.services
    let user = currentUser[0]
    let list =[
        {
            'tracking': 'Andrei ',
            'name': 'Masharin',
            'type': 'Owner, Tenant',
            'phone': '777-444-6556',
            'value': '432',
            'status': 'Los Alisos',
            'address': '2400 Harbor Boulevard ',
            'city': 'Costa Mesa',
            'state': 'CA',
            'age': '94454',
       },
       {
            'tracking': 'Anje',
            'name': 'Keizer',
            'type': 'N/A',
            'phone': '713-810-8418',
            'value': '343',
            'status': 'Cameron',
            'address': '3848 Michael Street',
            'city': 'Hendley',
            'state': 'NE',
            'age': '68946',
       },
        {
            'tracking': 'Arina',
            'name': 'Belomestnykh',
            'type': 'Owner, Tenant',
            'phone': '937-755-9651',
            'value': '454',
            'status': 'Fort Kent',
            'address': '1918  Crim Lane',
            'city': 'New Madison',
            'state': 'OH',
            'age': '45346',
       },
       {
            'tracking': 'Darius',
            'name': 'Cummings',
            'type': 'N/A',
            'phone': '937-755-9651',
            'value': '123',
            'status': 'Dennehotso',
            'address': '3848  Michael Street',
            'city': 'Costa Mesa',
            'state': 'NE',
            'age': '68946',
       },
       {
            'tracking': 'Francisco',
            'name': 'Maia',
            'type': 'Owner, Tenant',
            'phone': '937-755-9651',
            'value': '565',
            'status': 'Cameron',
            'address': '3848 Michael Street',
            'city': 'Hendley',
            'state': 'NE',
            'age': '45346',
       },
       {
            'tracking': 'Chinelo',
            'name': 'Chyke',
            'type': 'N/A',
            'phone': '937-755-9651',
            'value': '545',
            'status': 'Dennehotso',
            'address': '3848 Michael Street',
            'city': 'Costa Mesa',
            'state': 'NE',
            'age': '68946',
       }, 
       {
            'tracking': 'Andrei ',
            'name': 'Masharin',
            'type': 'Owner, Tenant',
            'phone': '777-444-6556',
            'value': '432',
            'status': 'Los Alisos',
            'address': '2400 Harbor Boulevard ',
            'city': 'Costa Mesa',
            'state': 'CA',
            'age': '94454',
       },
       {
            'tracking': 'Anje',
            'name': 'Keizer',
            'type': 'N/A',
            'phone': '713-810-8418',
            'value': '343',
            'status': 'Cameron',
            'address': '3848 Michael Street',
            'city': 'Hendley',
            'state': 'NE',
            'age': '68946',
       },
        {
            'tracking': 'Arina',
            'name': 'Belomestnykh',
            'type': 'Owner, Tenant',
            'phone': '937-755-9651',
            'value': '454',
            'status': 'Fort Kent',
            'address': '1918  Crim Lane',
            'city': 'New Madison',
            'state': 'OH',
            'age': '45346',
       },
       {
            'tracking': 'Darius',
            'name': 'Cummings',
            'type': 'N/A',
            'phone': '937-755-9651',
            'value': '123',
            'status': 'Dennehotso',
            'address': '3848  Michael Street',
            'city': 'Costa Mesa',
            'state': 'NE',
            'age': '68946',
       },
       {
            'tracking': 'Francisco',
            'name': 'Maia',
            'type': 'Owner, Tenant',
            'phone': '937-755-9651',
            'value': '565',
            'status': 'Cameron',
            'address': '3848 Michael Street',
            'city': 'Hendley',
            'state': 'NE',
            'age': '45346',
       },
       {
            'tracking': 'Chinelo',
            'name': 'Chyke',
            'type': 'N/A',
            'phone': '937-755-9651',
            'value': '545',
            'status': 'Dennehotso',
            'address': '3848 Michael Street',
            'city': 'Costa Mesa',
            'state': 'NE',
            'age': '68946',
       }, 
]
    console.log(services)
    warehouseDB.find().then(
        (documents)=>{
            if(services == 'moh'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/moh'),
                    list: list,
                    moment: moment,
                    user,
                })
            }
            else if(services == 'jpmc'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/jpmc'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }
            else if(services == 'panaga'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/panaga'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }
            else if(services == 'fmx'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/fmx'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }
            else if(services == 'zalora'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/zalora'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }else if(services == 'grp'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/grp'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }
            else if(services == 'runner'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/runner'),
                    list: documents,
                    moment: moment,
                    user,
                })
            }
            else if(services == 'personal'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/personal'),
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
})

//GET Podlist //done
router.get('/:services-podlist', (req,res)=>{
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
                res.render('podlist',{
                    title: `${service} POD List`,
                    partials: ('./partials/podlist/jpmc'),
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
    else if(services == 'panaga'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/panaga'),
            moment: moment,
            document,
            user
        })
    }
    else if(services == 'fmx'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/fmx'),
            moment: moment,
            document,
            user
        })
    }
    else if(services == 'zalora'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/zalora'),
            moment: moment,
            document,
            user
        })
    }else if(services == 'grp'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/grp'),
            moment: moment,
            document,
            user
        })
    }
    else if(services == 'runner'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/runner'),
            moment: moment,
            user
        })
    }
    else if(services == 'personal'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/personal'),
            moment: moment,
            document,
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
})

//GET Restock Order //done
router.get('/restock_order', (req,res)=>{
    waybillDB.find().sort({$natural: -1}).limit(1).then(
        (result)=>{
            if(result.podsequence == undefined || 0 || null){
                let sequence = 1
                console.log(result.podsequence)
                res.render('restock',{
                    title: `BMF WAYBILL`,
                    sequence: sequence,
                    moment: moment,
                })
            }
            else{
                let sequence = result.podsequence + 1
                console.log(result.podsequence)
                res.render('restock',{
                    title: `BMF WAYBILL`,
                    sequence: sequence,
                    moment: moment,
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
})

//GET Export page
router.get('/export', (req,res)=>{
    res.render('export', {
        title: "Login",
        partials: './partials/export/entryexport.ejs',
        moment: moment,
    })
})

router.get('/exportlist', (req,res)=>{
    res.render('export', {
        title: "Login",
        partials: './partials/export/exportlist.ejs',
        moment: moment,
    })
})

//GET New User //done
router.get('/user_register', (req,res)=>{
    let user = currentUser[0]
    res.render('user', {
        title: "New User",
        partials: './partials/user/register.ejs',
        moment: moment,
        user
    })
})

//POST success
router.post('/success', insertUser)

//POST success
router.post('/login', updatePassword)

//GET Change Password //done
router.get('/change-password', (req,res)=>{
    res.render('login', {
        title: "Change Password",
        partials: './partials/user/changePassword.ejs',
        moment: moment,
    })
})

//GET Forgot Password //front-end
router.get('/forgot-password', (req,res)=>{
    res.render('login', {
        title: "Forgot Password",
        partials: './partials/user/forgotPassword.ejs',
        moment: moment,
    })
})

//GET User List //front-end
router.get('/userlist', (req,res)=>{
    userDB.find().then(
        (documents)=>{
            res.render('userlist', {
                title: "User List",
                documents,
                moment: moment
            })
        },
        (err)=>{
            console.log(err)
            res.render('error', {
                title: '404',
                response: '',
                message: 'Page not found'
            })
        }
    )
    res.render('dashboard', {
        title: "Login",
        moment: moment,
    })
})

//GET logout //front-end
router.get('/logout', (req,res)=>{
    let session = req.session
    session.destroy((err)=>{
        if (err) return res.sendStatus(400)
        res.render('login', {
            title: 'login',
            moment: moment
        })
        console.log('session destroy')
    })
})

//post
//router.post('/dashboard', loginUser)

module.exports = router