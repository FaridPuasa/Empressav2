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
const store = new session.MemoryStore
//Server setup
let server = http.createServer(app)
let io = socketIO(server)

//Session setup
app.use(session({
    secret: 'Unknown Value',
    cookie: {maxAge: 20000},
    saveUninitialized: false,
    resave: false,
    store
}))

app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('.'))
app.use(flash());

//Global varibales
app.use(function (req, res, next) {
    //console.log(store)
    res.locals.message = req.flash()
    next();
});

app.set('view engine', 'ejs')

const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log('Database Connected'))
.catch(err => console.log(err))

app.use('/', routes)

/*
app.get('/', (req,res)=>{
    res.render('layout', {
        title: "demo",
        moment: moment
    })
})
*/

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
const waybillDB = require('./models/restock')
const stockDB = require('./models/stocks')
const pickupDB = require ('./models/pickup')

const cs = warehouseDB.watch()
const podMohWatch = mohPodDB.watch()

const trasporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "it-support@globex.com.bn",
        pass: "hixxuosmyygxvcpg"
    }
})

const options ={
    from: "it-support@globex.com.bn",
    to: "farid.puasa@globex.com.bn",
    cc: "john.ang@globex.com.bn",
    subject: "New POD Created.",
    text: "New POD has been created by the Operation Team. <Link>"
}

podMohWatch.on('change', change =>{
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
    //io.emit('changeData', change)
    //console.log(JSON.stringify(change))
})

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

const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`Server start on ${PORT}`))
//update

//script for front end
/*
<script src="/socket.io/socket.io.js"></script>
    <script type="text/javascript">
        
    </script>
*/
