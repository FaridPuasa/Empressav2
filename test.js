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

function secure(req,res,next){
    let loggedIn = req.session.loggedIn
    console.log(req.session.loggedIn)
    if(loggedIn === true){
        next()
    }
    else{
        res.redirect('/login')
    }
}

app.post('/dashboard', (req,res)=>{
    let session = req.session
    console.log(session.id)
    session.loggedIn = true
    if(req.body.username === user.username){
        console.log(session.loggedIn)
        res.status(200).json({user, loggedIn: session.loggedIn})
    }
    else{
        res.sendStatus(401)
    }
})

app.get('/boom', secure, (req,res)=>{
    res.json({message: 'mr loba loba'})
})

app.get('/logout', (req,res)=>{
   let session = req.session
   session.destroy((err)=>{
    if (err) return res.sendStatus(400)
    res.json({message: 'user logged out'})
    console.log('session destroy')
    console.log(session)
   })
})

const PORT = process.env.PORT || 6000;
server.listen(PORT, console.log(`Server start on ${PORT}`))


/*
let posts = [
    {
        'username': 'test',
        'post': "posting 1"
    },
    {
        'username': 'Farid',
        'post': "posting 1000"
    }
]

router.get('/post', authenticateToken, (req,res)=>{
    res.json(posts.filter(post => post.username === req.user.name))
})

let refreshTokens = []

router.post('/token', (req,res) =>{
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshToken.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken: accessToken})
    })
})

router.post('/test', (req,res)=>{
    const username = req.body.username
    const user = {name: username}
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
    refreshTokens.push(refreshToken)
    //console.log(process.env.ACCESS_TOKEN_SECRET)
    console.log(accessToken)
    res.json({accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m'})
}

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        //console.log(process.env.ACCESS_TOKEN_SECRET)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
*/