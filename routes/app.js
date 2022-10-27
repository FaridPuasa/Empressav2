//comfigure connect-flash
//https://stackoverflow.com/questions/49906557/how-to-use-connect-flash-with-ejs-in-express-4-x

//notifications
//https://fjolt.com/article/javascript-notification-system-service-workers

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
    res.render('dashboard', {
        title: "Login",
        moment: moment,
    })
})

router.get('/pod/:service', (req,res)=>{
    podDB.find().sort({$natural: -1}).limit(1).next().then(
        (result)=>{
            console.log(result)
        },
        (err)=>{
            console.log("Error on POD:" + err)
        }
    )
})

router.get('/:services-in', (req,res)=>{
    let services = req.params.services
    console.log(services)
    res.render('itemin', {
        title: 'Item In',
        moment: moment,

    })
})

router.get('/zalora', (req,res) => {
    res.render('zalorain', {
        title: "Login",
        moment: moment,
    })
})

router.get('/pharmacy', (req,res) => {
    res.render('pharmacyin', {
        title: "Login",
        moment: moment,
    })
})
router.get('/grp', (req,res)=>{
    res.render('grpin', {
        title: "Login",
        moment: moment,
    })
})
router.get('/grmy', (req,res)=>{
    res.render('grmy', {
        title: "Login",
        moment: moment,
        message: {
            success: "Test",
            error: "away"
        }
    })
})
router.get('/export', (req,res)=>{
    res.render('export', {
        title: "Login",
        moment: moment,
    })
})

/*
router.get('/pod', )
router.get('/podlist', )
*/

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