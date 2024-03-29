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
    updateZaloraPodStatus,
    updateZaloraSelf,
    updateZalora,
    financeAcknowledgeZalora
} = require ('../controller/zalora')

const {
    insertTmx,
    insertPodTmx,
    updateTmxPodStatus,
    updateTmxSelf,
    updateTmx,
    financeAcknowledgeTmx
} = require ('../controller/tmx')

const {
    insertFmx,
    insertPodFmx,
    updateFmxPodStatus,
    updateFmxSelf,
    updateFmx,
    financeAcknowledgeFmx
} = require ('../controller/fmx')

const {
    insertRunner,
    insertPodRunner,
    updateRunnerPodStatus,
    updateRunnerSelf,
    updateRunner,
    financeAcknowledgeRunner
} = require ('../controller/runner')

const {
    insertPersonal,
    insertPodPersonal,
    updatePersonalPodStatus,
    updatePersonalSelf,
    updatePersonal,
    financeAcknowledgePersonal
} = require ('../controller/personal')

const {
    insertGrp,
    insertPodGrp,
    updateGrpPodStatus,
    updateGrpSelf,
    updateGrp,
    financeAcknowledgeGrp
} = require ('../controller/grp')

const {
    insertLocal,
    insertPodLocal,
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
    updateMohPodStatus,
    updateMohSelf,
    updateJpmcPod,
    updateJpmcPodStatus,
    updateJpmcSelf,
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
    exportFinanceSummaryDriver,
    reconDriver,
    receiptGenerator,
    sendReceipt
} = require('../controller/export')

router.post('/receiptGenerate', receiptGenerator)

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
    stockPageOut,
    reentryPage,
    pickupRecord,
    restockRecord,
    miscList
} = require('../controller/page')

const {
    insertMisc,
    withdrawMisc
} = require('../controller/misc')

const { selfCollect, reentry } = require('../controller/withdraw');
const { insertRestock, insertPickup } = require('../controller/waybill');

/*
    notes:
    1. Insert Done for restock and pickup (Done)
    2. Add total to POD (Done) and pod editable by Managers & Admin. (Editable part) (on hold)
    3. Add in breakdown to finance summary (Syahmi) - pending
    4. Change from POD to warehouse (In Progress) - finance report
    5. Inventory Out (In Progress) //logic
    6. Email to notify new pod created (Using changestream to database and emit) (Done)
    7. Logout (Done)
    8. Hosting (Heroku) (Today after meeting)
    9. Beta Test
    10. Wellous (On Hold TBC)
    11. Dashboard (Restructure) 
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
router.post('/success-fin-service', exportFinanceSummary)//finance recon
router.post('/success-fin-drivers', exportFinanceSummary)//finance recon
router.post('/RS-success',reconService)//
router.post('/RD-success',reconDriver)//

//Item Entry & Exit
router.get('/:services-in', serviceIn)//Item In by services page
router.get('/in_stock', instock)//Item entry for instock items
router.get('/wellous', wellousPage)//Item entry for Wellous
router.get('/misc', miscPage)//Item entry for Miscellaneous
router.get('/misc-out', miscPageOut)//Item exit for Miscellaneous
router.get('/stock-out', stockPageOut)//Item exit for Miscellaneous
router.get('/re_entry', reentryPage)//Item entry for returning back to WH
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
router.post('/success-reentry', reentry)//Update misc out

//Item List 
router.get('/:services-list', itemList)//Item list by services page
router.get('/inventorylist', inventoryList)//Item list for instock 
router.get('/misclist', miscList)//Item list for instock 


//POD List
router.get('/:services-podlist', podList)//POD List by services page

router.get('/error', (req,res)=>{
    let sessionuser = req.session.user
    //console.log(sessionuser)
    let user = sessionuser
    res.render('error', {
        title: 'Error 404',
        code: '404',
        response: 'abc',
        message: 'ccc',
        user
    })
})

router.get('/success', (req,res)=>{
    let sessionuser = req.session.user
    //console.log(sessionuser)
    let user = sessionuser
    res.render('Success', {
        title: 'Success 404',
        code: '200',
        response: 'abc',
        message: 'ccc',
        user
    })
})


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
router.get('/restock_list', restockRecord)
router.post('/success-ro',insertRestock)
router.post('/success-po',insertPickup)
//Pickup 
router.get('/pickup_order', pickupForm)
router.get('/pickup_list', pickupRecord)
router.post('/success-po',insertPickup)


const easyinvoice = require('easyinvoice')
var fs = require('fs');
const axios = require('axios');
const url = require('url')
const warehouseDB = require('../models/warehouseInventory')
const FormData = require('form-data');

let dotenv = require('dotenv').config()
const waid = process.env.WAID
const wapw = process.env.WAPASS

router.get('/postTest',(req,res)=>{
    let body = req.body
    let tracker = body.tracker
    warehouseDB.find(tracker).then(
        (result)=>{
            let data = new FormData();
            let receipt = result[0].receipt
            data.append('method', 'UploadMedia');
            data.append('media_type', 'document');
            data.append('userid', waid);
            data.append('password', wapw);
            data.append('v', '1.1');
            data.append('auth_scheme', 'plain');
            data.append('format', 'json');
            data.append('media_file', fs.createReadStream(`./receipt/${receipt}.pdf`),`./receipt/${receipt}.pdf`);
            let config = {
                method: 'post',
                url: 'http://media.smsgupshup.com/GatewayAPI/rest',
                headers: { ...data.getHeaders()},
                data : data
            };

            axios(config)
                .then((response)=> {
                    console.log(JSON.stringify(response.data.response.id))
                    let filter = result[0]._id
                    let media = response.data.response.id //'tXxitm6WpT8ai88wBlJcezkMQioqhIzvTym8A_EGD3vIyGBr3SZn-BxQYQeFj9gYI7SYuIQKfI7mSURGmdbE8wtxvD_BOnWK-tkraQ'//
                    let update = {media: media}
                    let option = {upsert: false, new: false}
                    console.log(response.data.response.id)
                    warehouseDB.findByIdAndUpdate(filter,update,option,(err,docs)=>{
                        if(err){
                            console.log(err)
                            console.log("Error on updating the media id")
                        }
                        else{
                            console.log(docs)
                        }
                    })
                })
                .catch(err=>{console.log(err)})
        },
        (err)=>{
            console.log(err)
        }
    )
 })

 
router.get('/post',(req,res)=>{
    let body = req.body
    let filter = body.trackingNumber
    warehouseDB.find(filter).then(
        (result)=>{
            let media =  '7v1hBmb97TVMYD3-Mo3Zib1g7L2vChNvRyycPKxyy2c-tKsaeHv3LTJ6cVRsTF6Tiy7gkdgeUEUvk9O8cKkAeQLNhIOOV-KM2_4hlQ' //result[0].mid
            //let contact = "00" + result[0].contactNumber
            let contact = '006737257190' //result[0].contactNumber
            let url = `
            http://media.smsgupshup.com/GatewayAPI/rest?
            format=json&
            userid=${waid}&
            password=${wapw}&
            v=1.1&
            auth_scheme=plain&
            msg_type=DOCUMENT&
            method=SendMediaMessage&
            media_id=${media}&,
            caption=Hello, This is your receipt. Thank you for using our services.&
            footer=Go Rush Express&
            isTemplate=true&
            send_to=${contact}`

            let data = new FormData();
            let config = {
                method: 'get',
                url: url,
                headers: { 
                ...data.getHeaders()
                },
                data : data
            };
            
            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        (err)=>{
            console.log(err)
        }
    )
})


router.get('/test',(req,res)=>{
    const FormData = require('form-data');
    
    const form = new FormData();
    form.append('method', 'UploadMedia');
    form.append('media_type', 'DOCUMENT');
    form.append('userid', '2000215252');//.env
    form.append('password', '6@SemFzr');//.env
    form.append('v', '1.1');
    form.append('auth_scheme', 'plain');
    form.append('format', 'json');
    form.append('media_file', fs.readFileSync('./receipt/test.pdf'), '"./receipt/test.pdf"');//file name pulled from database
    
    axios.post('https://media.smsgupshup.com/GatewayAPI/rest',form,{headers:{'Content-Type': '"multipart/form-data"' }})
    .then(response=>{
        //console.log(response)
        console.log(response.data.response.id)
        const media = 'VuYUhXjW1kE07V0dOoyNpyx0Vb0-f3akybrUdMR13G8Okmop24XG_G9xlVO3uQhs09hvAls1LbQfVBg9AeE6nSurTYE2Ttg6ZGjYRg'//response.data.response.id //'tXxitm6WpT8ai88wBlJcezkMQioqhIzvTym8A_EGD3vIyGBr3SZn-BxQYQeFj9gYI7SYuIQKfI7mSURGmdbE8wtxvD_BOnWK-tkraQ'//
        console.log(media)
        let atad = {
            'format': 'json',
            'userid': '2000215252',//.env
            'password': '6@SemFzr',//.env
            'send_to': '006737257190',//dynamic phone number
            'v': '1.1',
            'auth_scheme': 'plain',
            'msg_type': 'DOCUMENT',
            'method': 'SendMediaMessage',
            'media_id': `${media}`,
            'caption': 'Hello, This is your receipt. Thank you for using our services.',
            'footer': 'Go Rush Express',
            'isTemplate': 'true'
        }
        const query = new url.URLSearchParams(atad)
        axios.get(`https://media.smsgupshup.com/GatewayAPI/rest?${query}`)
        .then(result=>{console.log(result)})
        .catch(err=>{console.log(err)})
    })
    .catch(err=>{console.log(err)});

    //let phones = []
    //axios.get(`https://media.smsgupshup.com/GatewayAPI/rest?userid=2000215252&password=6@SemFzr&phone_number=${phones}&method=OPT_IN&auth_scheme=plain&v=1.1&channel=WHATSAPP&format=json`,).then(response=>{console.log(response)}).catch(err=>{console.log(err)})
    //const URL = 'https://media.smsgupshup.com/GatewayAPI/rest?send_to=006737257190&msg_type=Text&userid=2000215252&auth_scheme=plain&password=6@SemFzr&method=SendMessage&v=1.1&format=json&msg=This is your receipt.&header=Test&footer=Go Rush Management&isTemplate=true'
    //const data = '1673506769113.pdf'
    //const fileURL = `/media/DATA/${data}`
    //const URL = `https://media.smsgupshup.com/GatewayAPI/rest?method=UploadMedia&media_type=document&userid=2000215252&password=6@SemFzr&v=1.1&auth_scheme=plain&format=json&media_file=@/./receipt/1673506769113.pdf`
    //let a = "Farid Puasa"
    //let b = "123456789"
    //let c = "MOH"
    //let msg = `Hello%2C+${a}.%0A%0AWe+have+received+your+order.+Please+refer+to+the+following+for+your+reference.+%0A%0ATracking+Number%3A+${b}%0AService%3A+${c}%0A%0AThank+you+for+your+order`
    //let msg = `Hello%2C+Farid+Puasa.%0A%0AWe+have+received+your+order.+Please+refer+to+the+following+for+your+reference.+%0A%0ATracking+Number%3A+123456%0AService%3A+MOH%0A%0AThank+you+for+your+order.`
    
    //let msg = `Hello%2C%0A%0AWe+have+received+your+order.+Please+refer+to+the+following+for+your+reference.%0A%0ATracking+Number%3A+${b}%0A%0AOur+team+will+process+your+order.+Thank+you`
    // const dt = {
    //     'method': 'UploadMedia',
    //     'media_type': 'DOCUMENT',
    //     'userid': '2000215252',
    //     'password': '6@SemFzr',
    //     'v': '1.1',
    //     'auth_scheme' : 'plain',
    //     'format' : 'json',
    //     'media_file': `@/receipt/${data}`
    // }
    // const header = {
    //     'Content-Type' :'application/x-www-form-urlencoded',
    //     'Content-Type' :'multipart/form-data'
    // }
    // //const URL = `https://media.smsgupshup.com/GatewayAPI/rest?userid=2000215252&password=6@SemFzr&send_to=006737257190&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=${msg}&isTemplate=true&header=Order+Confirmation&footer=Go+Rush+Express`
    
    // const URL = 'https://media.smsgupshup.com/GatewayAPI/rest'
    // //console.log(URL)
    // //console.log(dt)
    // axios.post(URL,dt,{headers: header}).then(response=>{console.log(response)}).catch(err=>{console.log(err)})
    
})

router.get('/testget', (req,res)=>{
    res.render('testpage')
})




router.get('/sending', sendReceipt)

module.exports = router
