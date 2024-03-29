const express = require('express')
const app = express()
const routes = require('./routes/app') 
const session = require('express-session')
const bodyParser = require('body-parser')
const layouts = require('express-ejs-layouts')
const socketIO = require('socket.io')
const http = require('http')
const moment = require('moment')
const flash = require('connect-flash')
const nodemailer = require('nodemailer')
const MemoryStore = require('memorystore')(session)
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

const accessLogStream = fs.createWriteStream(path.join(__dirname, "system.log"), {flags: 'a'})
app.use(morgan('common', {stream: accessLogStream}))

//Server setup
let server = http.createServer(app)
let io = socketIO(server)

//Session setup
app.use(session({
    secret: 'Unknown Value',
    cookie: {maxAge: 1800000},
    store: new MemoryStore({
        checkPeriod: 86400000
    }),
    saveUninitialized: false,
    resave: false,
}))

app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('.'))
app.use(flash());

//Global varibales
app.use(function (req, res, next) {
    res.locals.message = req.flash()
    next();
});

app.set('view engine', 'ejs')

const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
mongoose.set('strictQuery',true)
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log('Database Connected'))
.catch(err => console.log(err))

app.use('/', routes)

const mohPodDB = require ('./models/mohpod')
const jpmcPodDB = require('./models/jpmcpod')
const panagaPodDB = require('./models/panagapod')
const zaloraPodDB = require('./models/zalorapod')
const localPodDB = require('./models/localpod')
const tmxPodDB = require('./models/tmxpod')
const fmxPodDB = require('./models/fmxpod')
const grpPodDB = require('./models/grppod')
const runnerPodDB = require('./models/runnerpod')
const personalPodDB = require('./models/personalpod')
const warehouseDB = require('./models/warehouseInventory')
const stockDB = require('./models/stocks')
const { default: axios } = require('axios')

const cs = warehouseDB.watch()
const podMohWatch = mohPodDB.watch()
const podJpmcWatch = jpmcPodDB.watch()
const podPanagaWatch = panagaPodDB.watch()
const localPodWatch = localPodDB.watch()
const tmxPodWatch = tmxPodDB.watch()
const zaloraPodWatch = zaloraPodDB.watch()
const fmxPodWatch = fmxPodDB.watch()
const grpPodWatch = grpPodDB.watch()
const runnerPodWatch = runnerPodDB.watch()
const personalPodWatch = personalPodDB.watch()

const trasporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "it-support@globex.com.bn",
        pass: "hixxuosmyygxvcpg"
    }
})

podMohWatch.on('change', change =>{
    const options ={
        from: "it-support@globex.com.bn",
        to: ["farid.puasa@globex.com.bn","ar@gorushbn.com"],
        cc: ["john.ang@globex.com.bn","farid.puasa@globex.com.bn", "nurellia.matzin@globex.com.bn", "syahmi.ghafar@globex.com.bn"],
        subject: "New POD Created.",
        text: "New POD for MOH has been created by the Operation Team. <Link>"
    }
    if (change.operationType == 'insert'){
        console.log("executing sending mail")
        trasporter.sendMail(options, (err, info)=>{
            if (err){
                console.log(err)
            }
            console.log(info.response)
        })
        console.log("mail sent!")
    }
    else{
        console.log("no mail send")
    }
    if (change.operationType == "update"){
        axios.get('https://media.smsgupshup.com/GatewayAPI/rest?send_to=006737257190&msg_type=Text&userid=2000215252&auth_scheme=plain&password=6@SemFzr&method=SendMessage&v=1.1&format=json&msg=This is your receipt.&header=Test&footer=Go Rush Management&isTemplate=true').then(result=>{console.log(result.data)}).catch(err=>{console.log(err)})
    }
})

podJpmcWatch.on('change', change =>{
    const options ={
        from: "it-support@globex.com.bn",
        to: "ar@gorushbn.com",
        cc: ["john.ang@globex.com.bn","farid.puasa@globex.com.bn", "nurellia.matzin@globex.com.bn", "syahmi.ghafar@globex.com.bn"],
        subject: "New POD Created.",
        text: "New POD for JPMC has been created by the Operation Team. <Link>"
    }
    if (change){
        console.log("executing sending mail")
        trasporter.sendMail(options, (err, info)=>{
            if (err){
                console.log(err)
            }
            console.log(info.response)
        })
        console.log("mail sent!")
    }
    else{
        console.log("no mail send")
    }
})

podPanagaWatch.on('change', change =>{
    const options ={
        from: "it-support@globex.com.bn",
        to: "ar@gorushbn.com",
        cc: ["john.ang@globex.com.bn","farid.puasa@globex.com.bn", "nurellia.matzin@globex.com.bn", "syahmi.ghafar@globex.com.bn"],
        subject: "New POD Created.",
        text: "New POD for Panaga has been created by the Operation Team. <Link>"
    }
    if (change){
        console.log("executing sending mail")
        trasporter.sendMail(options, (err, info)=>{
            if (err){
                console.log(err)
            }
            console.log(info.response)
        })
        console.log("mail sent!")
    }
    else{
        console.log("no mail send")
    }
})

localPodWatch.on('change', change =>{
    const options ={
        from: "it-support@globex.com.bn",
        to: "ar@gorushbn.com",
        cc: ["john.ang@globex.com.bn","farid.puasa@globex.com.bn", "nurellia.matzin@globex.com.bn", "syahmi.ghafar@globex.com.bn"],
        subject: "New POD Created.",
        text: "New POD for Local Delivery has been created by the Operation Team. <Link>"
    }
    if (change){
        console.log("executing sending mail")
        trasporter.sendMail(options, (err, info)=>{
            if (err){
                console.log(err)
            }
            console.log(info.response)
        })
        console.log("mail sent!")
    }
    else{
        console.log("no mail send")
    }
})

zaloraPodWatch.on('change', change =>{
    const options ={
        from: "it-support@globex.com.bn",
        to: "ar@gorushbn.com",
        cc: ["john.ang@globex.com.bn","farid.puasa@globex.com.bn", "nurellia.matzin@globex.com.bn", "syahmi.ghafar@globex.com.bn"],
        subject: "New POD Created.",
        text: "New POD for Zalora has been created by the Operation Team. <Link>"
    }
    if (change){
        console.log("executing sending mail")
        trasporter.sendMail(options, (err, info)=>{
            if (err){
                console.log(err)
            }
            console.log(info.response)
        })
        console.log("mail sent!")
    }
    else{
        console.log("no mail send")
    }
})



tmxPodWatch.on('change', change =>{
    const options ={
        from: "it-support@globex.com.bn",
        to: "ar@gorushbn.com",
        cc: ["john.ang@globex.com.bn","farid.puasa@globex.com.bn", "nurellia.matzin@globex.com.bn", "syahmi.ghafar@globex.com.bn"],
        subject: "New POD Created.",
        text: "New POD for TMX has been created by the Operation Team. <Link>"
    }
    if (change){
        console.log("executing sending mail")
        trasporter.sendMail(options, (err, info)=>{
            if (err){
                console.log(err)
            }
            console.log(info.response)
        })
        console.log("mail sent!")
    }
    else{
        console.log("no mail send")
    }
})

fmxPodWatch.on('change', change =>{
    const options ={
        from: "it-support@globex.com.bn",
        to: "ar@gorushbn.com",
        cc: ["john.ang@globex.com.bn","farid.puasa@globex.com.bn", "nurellia.matzin@globex.com.bn", "syahmi.ghafar@globex.com.bn"],
        subject: "New POD Created.",
        text: "New POD for FMX has been created by the Operation Team. <Link>"
    }
    if (change){
        console.log("executing sending mail")
        trasporter.sendMail(options, (err, info)=>{
            if (err){
                console.log(err)
            }
            console.log(info.response)
        })
        console.log("mail sent!")
    }
    else{
        console.log("no mail send")
    }
})

grpPodWatch.on('change', change =>{
    const options ={
        from: "it-support@globex.com.bn",
        to: "ar@gorushbn.com",
        cc: ["john.ang@globex.com.bn","farid.puasa@globex.com.bn", "nurellia.matzin@globex.com.bn", "syahmi.ghafar@globex.com.bn"],
        subject: "New POD Created.",
        text: "New POD for GRP has been created by the Operation Team. <Link>"
    }
    if (change){
        console.log("executing sending mail")
        trasporter.sendMail(options, (err, info)=>{
            if (err){
                console.log(err)
            }
            console.log(info.response)
        })
        console.log("mail sent!")
    }
    else{
        console.log("no mail send")
    }
})

runnerPodWatch.on('change', change =>{
    const options ={
        from: "it-support@globex.com.bn",
        to: "ar@gorushbn.com",
        cc: ["john.ang@globex.com.bn","farid.puasa@globex.com.bn", "nurellia.matzin@globex.com.bn", "syahmi.ghafar@globex.com.bn"],
        subject: "New POD Created.",
        text: "New POD for runner services has been created by the Operation Team. <Link>"
    }
    if (change){
        console.log("executing sending mail")
        trasporter.sendMail(options, (err, info)=>{
            if (err){
                console.log(err)
            }
            console.log(info.response)
        })
        console.log("mail sent!")
    }
    else{
        console.log("no mail send")
    }
})

personalPodWatch.on('change', change =>{
    const options ={
        from: "it-support@globex.com.bn",
        to: "ar@gorushbn.com",
        cc: ["john.ang@globex.com.bn","farid.puasa@globex.com.bn", "nurellia.matzin@globex.com.bn", "syahmi.ghafar@globex.com.bn"],
        subject: "New POD Created.",
        text: "New POD for Personal Shopping has been created by the Operation Team. <Link>"
    }
    if (change){
        console.log("executing sending mail")
        trasporter.sendMail(options, (err, info)=>{
            if (err){
                console.log(err)
            }
            console.log(info.response)
        })
        console.log("mail sent!")
    }
    else{
        console.log("no mail send")
    }
})
/*
// server setup
io.on('connection', (socket) =>{
    console.log("Socket Connected" + socket.id)
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected');
        console.log( socket.id + " Disconnected")
    })
})

cs.on('change', change =>{
    io.emit('notification', change)
    console.log(JSON.stringify(change))
})
*/

const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`Server start on ${PORT}`))
//update

//script for front end
/*
<script src="/socket.io/socket.io.js"></script>
    <script type="text/javascript">
        
    </script>
*/
