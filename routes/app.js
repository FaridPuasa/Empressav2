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
    login,
    wellousPage,
    miscPage
} = require('../controller/page')

const { selfCollect } = require('../controller/withdraw')

//User and Login
router.get('/', login)//Landing Page
router.get('/dashboard', dashboard)//Dashboard from nav bar
router.get('/user_register', register)//User Registration page
router.get('/change-password', passwordChange)//recheck
router.get('/forgot-password', passwordForgot)//recheck
router.get('/userlist', userList)//User list page
router.get('/logout', logout)//Logout from system
router.post('/dashboard', grantAccess)//After Login
router.post('/success', insertUser)//After new user register
router.post('/login', updatePassword)//After change password

//Agent
router.get('/newagent', driversRegister)//Agent Page
router.get('/agentlist', readAgent)//Agent list page
router.post('/success-agent', insertAgent)//Success page for agent register

//Extraction of Data
router.get('/export', exportForm)//Export Page
router.get('/export-finance', financeForm)//Finance Export Page
router.post('/exportlist', exportInventory)//
router.post('/summary-success', exportPodSummary)//

//Item Entry
router.get('/:services-in', serviceIn)//Item In by services page
router.get('/in_stock', instock)//Item entry for instock items
router.get('/wellous', wellousPage)//Item entry for Wellous
router.get('/misc', miscPage)//Item entry for Miscellaneous
router.post('/success-entry-zalora', insertZalora)//ZALORA Save to Warehouse DB
router.post('/success-entry-pharmacy', insertPharmacy)//MOH,JPMC,PANAGA Save to Warehouse DB
router.post('/success-entry-local', insertLocal)//LOCAL Save to Warehouse DB
router.post('/success-entry-tmx', insertTmx)//TMX Save to Warehouse DB
router.post('/success-entry-fmx', insertFmx)//FMX Save to Warehouse DB
router.post('/success-entry-grp', insertGrp)//GRP Save to Warehouse DB
router.post('/success-entry-runner', insertRunner)//RUNNER Save to Warehouse DB
router.post('/success-entry-personal', insertPersonal)//PERSONAL Save to Warehouse DB
router.post('/success-entry-wellous')// WELLOUS save to wellous DB
router.post('/success-entry-misc')//MISC save to misc DB
router.post('/success-instock', insertStock)//INSTOCK save to inventory DB

//Item List 
router.get('/:services-list', itemList)//Item list by services page
router.get('/inventory-list', inventoryList)//Item list for instock 

//POD List
router.get('/:services-podlist', podList)//POD List by services page

//Create POD
router.get('/:services-pod', service)//POD form page by services page
router.post('/success-entry-pod', insertPodMoh)//Save POD to DB MOH
router.post('/success-entry-pod', insertPodJpmc)//Save POD to DB JPMC
router.post('/success-entry-pod', insertPodPanaga)//Save POD to DB PANAGA
router.post('/success-entry-pod', insertPodLocal)//Save POD to DB LOCAL
router.post('/success-entry-pod', insertPodZalora)//Save POD to DB ZALORA
router.post('/success-entry-pod', insertPodTmx)//Save POD to DB TMX
router.post('/success-entry-pod', insertPodFmx)//Save POD to DB FMX
router.post('/success-entry-pod', insertPodRunner)//Save POD to DB RUNNER
router.post('/success-entry-pod', insertPodPersonal)//Save POD to DB PERSONAL
router.post('/success-entry-pod', insertPodGrp)//Save POD to DB GRP

//Selfcollection
router.get('/self-collect', self)//Self collect page

//POD Status
router.post('/success-POD', updateMohPodStatus)//After POD status update
router.post('/success-POD', updateJpmcPodStatus)//After POD status update
router.post('/success-POD', updatePanagaPodStatus)//After POD status update
router.post('/success-POD', updateLocalPodStatus)//After POD status update
router.post('/success-POD', updateZaloraPodStatus)//After POD status update
router.post('/success-POD', updateFmxPodStatus)//After POD status update
router.post('/success-POD', updateTmxPodStatus)//After POD status update
router.post('/success-POD', updateRunnerPodStatus)//After POD status update
router.post('/success-POD', updatePersonalPodStatus)//After POD status update
router.post('/success-POD', updateGrpPodStatus)//After POD status update

//Restock (BMF)
router.get('/restock_order', restockForm)
router.post('/',)

//Pickup 
router.get('/pickup_order', pickupForm)
router.post('/',)

//

module.exports = router