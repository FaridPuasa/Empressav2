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
const express = require('express');
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

//get
router.get('/', (req,res)=>{
    res.render('login', {
        title: "Login",
        moment: moment,
    })
})

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

router.get('/pod/:service', (req,res)=>{
    podDB.find().sort({$natural: -1}).limit(1).next().then(
        (result)=>{
            console.log(result)
        },
        (err)=>{
            console.log("Failed to append sequence: " + err)
        }
    )
})

router.get('/:services-pod', (req,res)=>{
    let services = req.params.services
    let service = services.toUpperCase()
    console.log(services)
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

router.get('/:services-in', (req,res)=>{
    let services = req.params.services
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

router.get('/:services-list', (req,res)=>{
    let services = req.params.services
    console.log(services)
    if(services == 'moh'){
        res.render('list',{
            title: `${services} List`,
            partials: ('./partials/list/moh'),
            moment: moment,
        })
    }
    else if(services == 'jpmc'){
        res.render('list',{
            title: `${services} List`,
            partials: ('./partials/list/jpmc'),
            moment: moment,
        })
    }
    else if(services == 'panaga'){
        res.render('list',{
            title: `${services} List`,
            partials: ('./partials/list/panaga'),
            moment: moment,
        })
    }
    else if(services == 'fmx'){
        res.render('list',{
            title: `${services} List`,
            partials: ('./partials/list/fmx'),
            moment: moment,
        })
    }
    else if(services == 'zalora'){
        res.render('list',{
            title: `${services} List`,
            partials: ('./partials/list/zalora'),
            moment: moment,
        })
    }else if(services == 'grp'){
        res.render('list',{
            title: `${services} List`,
            partials: ('./partials/list/grp'),
            moment: moment,
        })
    }
    else if(services == 'runner'){
        res.render('list',{
            title: `${services} List`,
            partials: ('./partials/list/runner'),
            moment: moment,
        })
    }
    else if(services == 'personal'){
        res.render('list',{
            title: `${services} List`,
            partials: ('./partials/list/personal'),
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

router.get('/:services-list', (req,res)=>{
    let services = req.params.services
    console.log(services)
    if(services == 'moh'){
        res.render('podlist',{
            title: `${services} List`,
            partials: ('./partials/podlist/moh'),
            moment: moment,
        })
    }
    else if(services == 'jpmc'){
        res.render('podlist',{
            title: `${services} List`,
            partials: ('./partials/podlist/jpmc'),
            moment: moment,
        })
    }
    else if(services == 'panaga'){
        res.render('podlist',{
            title: `${services} List`,
            partials: ('./partials/podlist/panaga'),
            moment: moment,
        })
    }
    else if(services == 'fmx'){
        res.render('podlist',{
            title: `${services} List`,
            partials: ('./partials/podlist/fmx'),
            moment: moment,
        })
    }
    else if(services == 'zalora'){
        res.render('podlist',{
            title: `${services} List`,
            partials: ('./partials/podlist/zalora'),
            moment: moment,
        })
    }else if(services == 'grp'){
        res.render('podlist',{
            title: `${services} List`,
            partials: ('./partials/podlist/grp'),
            moment: moment,
        })
    }
    else if(services == 'runner'){
        res.render('podlist',{
            title: `${services} List`,
            partials: ('./partials/podlist/runner'),
            moment: moment,
        })
    }
    else if(services == 'personal'){
        res.render('podlist',{
            title: `${services} List`,
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

router.get('/:services-list', (req,res)=>{
    let services = req.params.services
    console.log(services)
    if(services == 'moh'){
        res.render('export',{
            title: `${services} List`,
            partials: ('./partials/export/moh'),
            moment: moment,
        })
    }
    else if(services == 'jpmc'){
        res.render('export',{
            title: `${services} List`,
            partials: ('./partials/export/jpmc'),
            moment: moment,
        })
    }
    else if(services == 'panaga'){
        res.render('export',{
            title: `${services} List`,
            partials: ('./partials/export/panaga'),
            moment: moment,
        })
    }
    else if(services == 'fmx'){
        res.render('export',{
            title: `${services} List`,
            partials: ('./partials/export/fmx'),
            moment: moment,
        })
    }
    else if(services == 'zalora'){
        res.render('export',{
            title: `${services} List`,
            partials: ('./partials/export/zalora'),
            moment: moment,
        })
    }else if(services == 'grp'){
        res.render('export',{
            title: `${services} List`,
            partials: ('./partials/export/grp'),
            moment: moment,
        })
    }
    else if(services == 'runner'){
        res.render('export',{
            title: `${services} List`,
            partials: ('./partials/export/runner'),
            moment: moment,
        })
    }
    else if(services == 'personal'){
        res.render('export',{
            title: `${services} List`,
            partials: ('./partials/export/personal'),
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

//post
router.post('/dashboard', loginUser)
router.post('/register-success', insertUser)
router.post('/sad', )
router.post('/sat', )
router.post('/fri', )

readUser,
updateUser,
deleteUser,

module.exports = router