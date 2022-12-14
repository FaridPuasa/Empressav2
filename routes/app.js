//comfigure connect-flash
//https://stackoverflow.com/questions/49906557/how-to-use-connect-flash-with-ejs-in-express-4-x

//notifications
//https://fjolt.com/article/javascript-notification-system-service-workers

const express = require('express');
const session = require('express-session')
const router = express.Router();
const moment = require('moment')
const { request } = require('http')

//controller user
const {
    insertStock,
    readStock,
    updateStock,
    removeStock
} = require('../controller/stock')

const {
    insertUser,
    grantAccess,
    updatePassword,
    currentUser,
    readUser,
    updateUser,
    deleteUser,
    readLogin,
    userList,
    insertAgent,
    readAgent
} = require('../controller/user')

const {
    insertZalora,
    insertPodZalora,
    updateZaloraPod,
    updateZaloraPodStatus,
    updateZaloraSelf,
    updateZalora
} = require ('../controller/zalora')

const {
    insertTmx,
    insertPodTmx,
    updateTmxPod,
    updateTmxPodStatus,
    updateTmxSelf,
    updateTmx
} = require ('../controller/tmx')

const {
    insertFmx,
    insertPodFmx,
    updateFmxPod,
    updateFmxPodStatus,
    updateFmxSelf,
    updateFmx
} = require ('../controller/fmx')

const {
    insertRunner,
    insertPodRunner,
    updateRunnerPod,
    updateRunnerPodStatus,
    updateRunnerSelf,
    updateRunner
} = require ('../controller/runner')

const {
    insertPersonal,
    insertPodPersonal,
    updatePersonalPod,
    updatePersonalPodStatus,
    updatePersonalSelf,
    updatePersonal
} = require ('../controller/personal')

const {
    insertGrp,
    insertPodGrp,
    updateGrpPod,
    updateGrpPodStatus,
    updateGrpSelf,
    updateGrp
} = require ('../controller/grp')

const {
    insertLocal,
    insertPodLocal,
    updateLocalPod,
    updateLocalPodStatus,
    updateLocalSelf,
    updateLocal
} = require ('../controller/local')

const {
    insertPharmacy,
    insertPodMoh,
    insertPodJpmc,
    insertPodPanaga,
    updateMohPod,
    updateMohPodStatus,
    updateMohSelf,
    updateJpmcPod,
    updateJpmcPodStatus,
    updateJpmcSelf,
    updatePanagaPod,
    updatePanagaPodStatus,
    updatePanagaSelf,
    updateMoh,
    updateJpmc,
    updatePanaga
} = require ('../controller/pharmacy')

const {
    exportInventory, 
    exportPodSummary
} = require('../controller/export')

const {
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
    login
} = require('../controller/page')


router.post('/success-POD', updateMohPodStatus)
router.post('/success-in-moh', insertPharmacy)
router.post('/success-instock', insertStock)
router.get('/self-collect', self)
router.get('/in_stock', instock)
router.get('/inventory-list', inventoryList)

//GET Login //done
router.get('/', login)

//POST Login
router.post('/dashboard', grantAccess)
router.get('/dashboard', dashboard)

router.post('/success-entry', insertZalora)
router.post('/success-entry-pod', insertPodMoh)

//GET Create POD 
router.get('/:services-pod', service)

//GET Item In 
router.get('/:services-in', serviceIn )

//GET Item List 
router.get('/:services-list', itemList)

//GET Podlist 
router.get('/:services-podlist', podList)

//GET Restock Order 
router.get('/restock_order', restockForm)

//GET Export
router.get('/export', exportForm)
router.get('/export-finance', financeForm)
router.get('/pickup_order', pickupForm)
//POST Export
router.post('/exportlist', exportInventory)
router.post('/summary-success', exportPodSummary)

//GET New User 
router.get('/user_register', register)

//POST success
router.post('/success', insertUser)

//POST success
router.post('/login', updatePassword)

//GET Change Password 
router.get('/change-password', passwordChange)

//GET Forgot Password 
router.get('/forgot-password', passwordForgot)

//GET User List 
router.get('/userlist', userList)

//GET logout 
router.get('/logout', logout)

router.get('/newagent', driversRegister)
router.post('/success-agent', insertAgent)
router.get('/agentlist', readAgent)

module.exports = router