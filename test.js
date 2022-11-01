const express = require('express')
const app = express()
const routes = require('./routes/app') 
const session = require('express-session')
const bodyParser = require('body-parser')
const layouts = require('express-ejs-layouts')
const socketIO = require('socket.io')
const http = require('http')
const moment = require('moment')
//Server setup
let server = http.createServer(app)
let io = socketIO(server)

//Session setup
app.use(session({
    secret: 'Unknown Value',
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: {
        maxAge: 2000,
    },
}))

app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const mongoose = require('mongoose');
const res = require('express/lib/response')
const { nextTick } = require('process')
const { TIMEOUT } = require('dns')
const db = require('./config/keys').MongoURI;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log('Database Connected'))
.catch(err => console.log(err))

//app.use('/', routes)

let user = 
{
    username: 'Tester',
    password: 'abc123'
}

app.get('/login', (req,res)=>{
    res.json({message: 'user ready to login'})
})





app.post('/dashboard', (req,res)=>{
    let session = req.session
    //console.log(session.id)
    if(req.body.username === user.username){
        setTimeout(()=> {
            timer(session),
            session.cookie.maxAge,
            console.log('session starts')
        })
        res.json(session)
    }
    else{
        res.sendStatus(401)
    }
})

function timer(session){
    session.destroy((err)=>{
        if (err) return res.sendStatus(401)
        res.writeHead(302, {
            'Location':
        })
        window.location.href = 'http://localhost:6000/logout'
    })
}


app.get('/logout', (req,res)=>{
   let session = req.session
   console.log(session.cookie.maxAge)
   session.destroy((err)=>{
    if (err) return res.sendStatus(400)
    res.json({message: 'user logged out'})
   })
})


const PORT = process.env.PORT || 6000;
server.listen(PORT, console.log(`Server start on ${PORT}`))
