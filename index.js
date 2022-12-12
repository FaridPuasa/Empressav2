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
const store = new session.MemoryStore
//Server setup
let server = http.createServer(app)
let io = socketIO(server)

//Session setup
app.use(session({
    secret: 'Unknown Value',
    cookie: {maxAge: 2000},
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

//const inventories = require('./models/inventories')

//const cs = inventories.watch()

/*
// server setup
io.on('connect', socket =>{
    console.log("User Connected")
    socket.on('disconnect', ()=>{
        console.log("User Disconnected")
    })
})

cs.on('change', change =>{
    io.emit('changeData', change)
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
