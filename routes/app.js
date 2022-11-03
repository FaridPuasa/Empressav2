//comfigure connect-flash
//https://stackoverflow.com/questions/49906557/how-to-use-connect-flash-with-ejs-in-express-4-x

//notifications
//https://fjolt.com/article/javascript-notification-system-service-workers

const mohPodDB = require ('../models/mohpod')
const jpmcPodDB = require('../models/jpmcpod')
const panagaPodDB = require('../models/panagapod')
const zaloraPodDB = require('../models/zalorapod')
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
//calling controllers
const {
    insertUser,
    readUser,
    updateUser,
    deleteUser,
    loginUser,
} = require('../controller/user')
const { request } = require('http')
/*const {
    insertExport,
    readExport,
} = require('../controller/export')*/
/*const {
    insertZalora,
    insertPharmacy,
    insertGrp,
    readItem,
    updateItemWH,
    updateItemTC,
    updateForOut,
    updateSelfCollect,
} = require('../controller/inventory')*/
/*const {
    insertPod,
    insertOnePod,
    insertTempPod,
    insertPodByList,
    readPod,
} = require('../controller/pod');
//const pod = require('../models/pod');
const { query } = require('express');
/*const {
    insertGrmy,
    readGrmy,
    updateGrmy,
} = require('../controller/grmy')*/

//GET Login //done
router.get('/', (req,res)=>{
    res.render('login', {
        title: "Login",
        moment: moment,
    })
})

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
            res.render('dashboard', {
                title: 'Dashboard',
                result,
            })
        },
        (err)=>{
            console.log("Error on POD:" + err) 
        }
    )
})

//GET Create POD //awaiting syahmi action - authorization required
router.get('/:services-pod', (req,res)=>{
    let services = req.params.services
    let service = services.toUpperCase()
    console.log(service)
    if(services == 'moh'){
        mohPodDB.find().sort({$natural: -1}).limit(1).then(
            (result)=>{
                if(result.podSequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/moh'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                    })
                }
                else{
                    let sequence = result.podSequence + 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/moh'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
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
                if(result.podSequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/jpmc'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                    })
                }
                else{
                    let sequence = result.podSequence + 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/jpmc'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
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
                if(result.podSequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/panaga'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                    })
                }
                else{
                    let sequence = result.podSequence + 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/panaga'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
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
                if(result.podSequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/fmx'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                    })
                }
                else{
                    let sequence = result.podSequence + 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/fmx'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
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
                if(result.podSequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/zalora'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                    })
                }
                else{
                    let sequence = result.podSequence + 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/zalora'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
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
                if(result.podSequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/grp'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
                    })
                }
                else{
                    let sequence = result.podSequence + 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/grp'),
                        service: service,
                        sequence: sequence,
                        moment: moment,
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
                if(result.podSequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/runner'),
                        service: service + ' SERVICES',
                        sequence: sequence,
                        moment: moment,
                    })
                }
                else{
                    let sequence = result.podSequence + 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/runner'),
                        service: service + ' SERVICES',
                        sequence: sequence,
                        moment: moment,
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
                if(result.podSequence == undefined || 0 || null){
                    let sequence = 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/personal'),
                        service: service  + ' SHOPPING',
                        sequence: sequence,
                        moment: moment,
                    })
                }
                else{
                    let sequence = result.podSequence + 1
                    console.log(result.podSequence)
                    res.render('pod',{
                        title: `${service} POD`,
                        partials: ('./partials/pod/personal'),
                        service: service + ' SHOPPING',
                        sequence: sequence,
                        moment: moment,
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
router.get('/:services-in/:number', (req,res)=>{
    let services = req.params.services
    let number = req.params.number
    console.log(services)
    if(services == 'moh'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/moh'),
            moment: moment,
        })
    }
    else if(services == 'jpmc'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/jpmc'),
            moment: moment,
        })
    }
    else if(services == 'panaga'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/panaga'),
            moment: moment,
        })
    }
    else if(services == 'fmx'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/fmx'),
            moment: moment,
        })
    }
    else if(services == 'zalora'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/zalora'),
            moment: moment,
        })
    }else if(services == 'grp'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/grp'),
            moment: moment,
        })
    }
    else if(services == 'runner'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/runner'),
            moment: moment,
        })
    }
    else if(services == 'personal'){
        res.render('itemin',{
            title: `${services} In`,
            partials: ('./partials/itemin/personal'),
            moment: moment,
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

//GET Item List //adding database into the loop
router.get('/:services-list', (req,res)=>{
    let services = req.params.services
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
       }, {
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
       }, {
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
       }
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
                })
            }
            else if(services == 'jpmc'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/jpmc'),
                    list: documents,
                    moment: moment,
                })
            }
            else if(services == 'panaga'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/panaga'),
                    list: documents,
                    moment: moment,
                })
            }
            else if(services == 'fmx'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/fmx'),
                    list: documents,
                    moment: moment,
                })
            }
            else if(services == 'zalora'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/zalora'),
                    list: documents,
                    moment: moment,
                })
            }else if(services == 'grp'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/grp'),
                    list: documents,
                    moment: moment,
                })
            }
            else if(services == 'runner'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/runner'),
                    list: documents,
                    moment: moment,
                })
            }
            else if(services == 'personal'){
                res.render('list',{
                    title: `${services} List`,
                    partials: ('./partials/list/personal'),
                    list: documents,
                    moment: moment,
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
    let service = services.toUpperCase()
    console.log(service)
    if(services == 'moh'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/moh'),
            moment: moment,
        })
    }
    else if(services == 'jpmc'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/jpmc'),
            moment: moment,
        })
    }
    else if(services == 'panaga'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/panaga'),
            moment: moment,
        })
    }
    else if(services == 'fmx'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/fmx'),
            moment: moment,
        })
    }
    else if(services == 'zalora'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/zalora'),
            moment: moment,
        })
    }else if(services == 'grp'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/grp'),
            moment: moment,
        })
    }
    else if(services == 'runner'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/runner'),
            moment: moment,
        })
    }
    else if(services == 'personal'){
        res.render('podlist',{
            title: `${service} POD List`,
            partials: ('./partials/podlist/personal'),
            moment: moment,
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
            if(result.podSequence == undefined || 0 || null){
                let sequence = 1
                console.log(result.podSequence)
                res.render('restock',{
                    title: `BMF WAYBILL`,
                    sequence: sequence,
                    moment: moment,
                })
            }
            else{
                let sequence = result.podSequence + 1
                console.log(result.podSequence)
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
    res.render('user', {
        title: "New User",
        partials: './partials/user/register.ejs',
        moment: moment,
    })
})

//GET Change Password //done
router.get('/change-password', (req,res)=>{
    res.render('user', {
        title: "Change Password",
        partials: './partials/user/changePassword.ejs',
        moment: moment,
    })
})

//GET Forgot Password //front-end
router.get('/forgot-password', (req,res)=>{
    res.render('user', {
        title: "New User",
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
router.post('/register-success', insertUser)
router.post('/sad', )
router.post('/sat', )
router.post('/fri', )

readUser,
updateUser,
deleteUser,

module.exports = router