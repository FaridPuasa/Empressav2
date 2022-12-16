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
    updateZalora,
    financeAcknowledgeZalora
} = require ('../controller/zalora')

const {
    insertTmx,
    insertPodTmx,
    updateTmxPod,
    updateTmxPodStatus,
    updateTmxSelf,
    updateTmx,
    financeAcknowledgeTmx
} = require ('../controller/tmx')

const {
    insertFmx,
    insertPodFmx,
    updateFmxPod,
    updateFmxPodStatus,
    updateFmxSelf,
    updateFmx,
    financeAcknowledgeFmx
} = require ('../controller/fmx')

const {
    insertRunner,
    insertPodRunner,
    updateRunnerPod,
    updateRunnerPodStatus,
    updateRunnerSelf,
    updateRunner,
    financeAcknowledgeRunner
} = require ('../controller/runner')

const {
    insertPersonal,
    insertPodPersonal,
    updatePersonalPod,
    updatePersonalPodStatus,
    updatePersonalSelf,
    updatePersonal,
    financeAcknowledgePersonal
} = require ('../controller/personal')

const {
    insertGrp,
    insertPodGrp,
    updateGrpPod,
    updateGrpPodStatus,
    updateGrpSelf,
    updateGrp,
    financeAcknowledgeGrp
} = require ('../controller/grp')

const {
    insertLocal,
    insertPodLocal,
    updateLocalPod,
    updateLocalPodStatus,
    updateLocalSelf,
    updateLocal,
    financeAcknowledgeLocal
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
    updatePanaga,
    financeAcknowledgePanaga,
    financeAcknowledgeJpmc,
    financeAcknowledgeMoh
} = require ('../controller/pharmacy')

const {
    exportInventory, 
    exportFinanceSummary,
    reconService,
    exportFinanceSummaryDriver
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
    financeFormDrivers,
    pickupForm,
    register,
    passwordChange,
    passwordForgot,
    driversRegister,
    logout,
    login,
    wellousPage,
    miscPage,
    miscPageOut,
    stockPageOut
} = require('../controller/page')

const {
    insertMisc,
    withdrawMisc
} = require('../controller/misc')

const { selfCollect } = require('../controller/withdraw')

/*
    1. Email to notify new pod created
    2. inventory out >>>> restock & pickup pages and fucntions >>>> organized scripts >>>> Add total to POD and pod editable by Managers & Admin. >>>> Add in breakdown to finance summary >>>> change from POD to warehouse
    3. beta test
    4. logout
    5. Hosting
    6. wellous flow ??

    notes:
    1. Insert Done for restock and pickup (status to be added)
    
*/

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
router.get('/export-finance-by-driver', financeFormDrivers)
router.post('/exportlist', exportInventory)//
router.post('/success-fin-service', exportFinanceSummary)//
router.post('/success-fin-drivers', exportFinanceSummary)//

//Item Entry & Exit
router.get('/:services-in', serviceIn)//Item In by services page
router.get('/in_stock', instock)//Item entry for instock items
router.get('/wellous', wellousPage)//Item entry for Wellous
router.get('/misc', miscPage)//Item entry for Miscellaneous
router.get('/misc-out', miscPageOut)//Item exit for Miscellaneous
router.get('/stock-out', stockPageOut)//Item exit for Miscellaneous
router.post('/success-entry-zalora', insertZalora)//ZALORA Save to Warehouse DB
router.post('/success-entry-pharmacy', insertPharmacy)//MOH,JPMC,PANAGA Save to Warehouse DB
router.post('/success-entry-local', insertLocal)//LOCAL Save to Warehouse DB
router.post('/success-entry-tmx', insertTmx)//TMX Save to Warehouse DB
router.post('/success-entry-fmx', insertFmx)//FMX Save to Warehouse DB
router.post('/success-entry-grp', insertGrp)//GRP Save to Warehouse DB
router.post('/success-entry-runner', insertRunner)//RUNNER Save to Warehouse DB
router.post('/success-entry-personal', insertPersonal)//PERSONAL Save to Warehouse DB
router.post('/success-entry-wellous')// WELLOUS save to wellous DB
router.post('/success-entry-misc', insertMisc)//MISC save to misc DB
router.post('/success-instock', insertStock)//INSTOCK save to inventory DB
router.post('/success-collection', selfCollect)//Update self collect
router.post('/success-miscellaneous-out', withdrawMisc)//Update misc out

//Item List 
router.get('/:services-list', itemList)//Item list by services page
router.get('/inventory-list', inventoryList)//Item list for instock 

//POD List
router.get('/:services-podlist', podList)//POD List by services page

//Create POD
router.get('/:services-pod', service)//POD form page by services page
router.post('/success-pod-moh', insertPodMoh)//Save POD to DB MOH
router.post('/success-pod-jpmc', insertPodJpmc)//Save POD to DB JPMC
router.post('/success-pod-panaga', insertPodPanaga)//Save POD to DB PANAGA
router.post('/success-pod-local', insertPodLocal)//Save POD to DB LOCAL
router.post('/success-pod-zalora', insertPodZalora)//Save POD to DB ZALORA
router.post('/success-pod-tmx', insertPodTmx)//Save POD to DB TMX
router.post('/success-pod-fmx', insertPodFmx)//Save POD to DB FMX
router.post('/success-pod-runner', insertPodRunner)//Save POD to DB RUNNER
router.post('/success-pod-personal', insertPodPersonal)//Save POD to DB PERSONAL
router.post('/success-pod-grp', insertPodGrp)//Save POD to DB GRP

//Selfcollection
router.get('/self-collect', self)//Self collect page

//POD Status
router.post('/update-POD-moh', updateMohPodStatus)//After POD status update
router.post('/update-POD-jpmc', updateJpmcPodStatus)//After POD status update
router.post('/update-POD-panaga', updatePanagaPodStatus)//After POD status update
router.post('/update-POD-local', updateLocalPodStatus)//After POD status update
router.post('/update-POD-zalora', updateZaloraPodStatus)//After POD status update
router.post('/update-POD-fmx', updateFmxPodStatus)//After POD status update
router.post('/update-POD-tmx', updateTmxPodStatus)//After POD status update
router.post('/update-POD-runner', updateRunnerPodStatus)//After POD status update
router.post('/update-POD-personal', updatePersonalPodStatus)//After POD status update
router.post('/update-POD-grp', updateGrpPodStatus)//After POD status update
router.post('/finance-edit-fmx', financeAcknowledgeFmx)//Finance Acknowledge POD
router.post('/finance-edit-grp', financeAcknowledgeGrp)//Finance Acknowledge POD
router.post('/finance-edit-moh', financeAcknowledgeMoh)//Finance Acknowledge POD
router.post('/finance-edit-tmx', financeAcknowledgeTmx)//Finance Acknowledge POD
router.post('/finance-edit-runner', financeAcknowledgeRunner)//Finance Acknowledge POD
router.post('/finance-edit-personal', financeAcknowledgePersonal)//Finance Acknowledge POD
router.post('/finance-edit-local',  financeAcknowledgeLocal)//Finance Acknowledge POD
router.post('/finance-edit-panaga', financeAcknowledgePanaga)//Finance Acknowledge POD
router.post('/finance-edit-jpmc', financeAcknowledgeJpmc)//Finance Acknowledge POD
router.post('/finance-edit-zalora', financeAcknowledgeZalora)//Finance Acknowledge POD

//Restock (BMF)
router.get('/restock_order', restockForm)
router.post('/success-ro',)

//Pickup 
router.get('/pickup_order', pickupForm)
router.post('/success-po',)

//

module.exports = router