const userDB = require('../models/user')
const moment = require('moment')
const bcrypt = require('bcrypt')
const flash = require('connect-flash')
const { append } = require('express/lib/response')
const router = require('../routes/app')
const user = require('../models/user')

/*
Admin = 10
Managers = 11
Finance = 12
User = 13
*/

/*
Zalora = 100
FMX = 101
MOH = 200
JPMC = 201
Panaga = 202
Local = 300
Thermomix = 301
Runner = 400
personal = 401
Misc = 500
*/

const roles = [10,11,12,13]
const services = [100,101,200,201,202,300,301,400,401,500]

const insertUser = ((req,res)=>{
    let date = moment().format('DD/MM/YYYY')
    let data = req.body
    let name = data.name
    let uid = data.uid
    let user = new userDB({
        name: name,
        uid: uid,
        password: data.password,
        access: data.access,
        email: data.email,
        contact: data.contact,
        role: data.role,
        service: data.services,
        firsttime: 'true',
        dateCreate: date
    })
    user.save((err) =>{
        if(err) {
            console.log(err)
            res.render('error', {
                title: '404',
                response: '',
                message: 'Page not found'
            })
        }
       else{
            res.render ('success', {
                title: 'success',
                response: 'Account Created',
                message: `Account for user ${name} successfuly created. Login ID ${uid}.`,
            })
       }
    })
})

const grantAccess = ((req,res)=>{
    let data = req.body
    let uid = data.uid
    let password = data.password
    console.log(req.sessionID)
    userDB.authenticate(uid, password, (err,user) =>{
        if (req.session.authenticated){
            console.log(req.session)
        }
        else{
            if (user) {
                req.session.authenticated = true
                req.session.user = user
                let currentUser = user
                console.log(currentUser)
                let firsttime = user.firsttime
                console.log(firsttime)
                if (firsttime === "true") {
                    res.render('changepassword', {uid: uid})
                }
                else if (firsttime === "false") {
                    res.render('dashboard',{
                        id: user._id,
                        name: user.name,
                        uid: user.uid,
                        contact: user.contact,
                    })
                }
                else{
                    console.log("Failed to detect user status [firsttimer == undefined]")
                    res.render('error')
                }
            }
            else {
                console.log(err)
                res.render('error')
            }
        }
    })
})

const updatePassword = (req,res) =>{
    let data = req.body
    let filter = data.uid
    let update = {password: data.password}
    bcrypt.hash(password,10,(err,hash)=>{
        if(err) return console.log (err)
        data.password = hash
        userDB.findOneAndUpdate(filter,update,option,(err,result)=>{
            if (err) return console.log (err)
            res.render('/login', {
                title: 'login',
                moment: moment,
            })
        })
    })
}

const readUser = ((req,res) => {
    userDB.find().then(
        (documents)=>{
            res.render('success',{
                title: '',
                response: '',
                message: '',
            })
        },
        (err)=>{
            res.render('error', {
                title: '401',
                response: '',
                message: '',
            })
        }
    )
})

const updateUser = ((req,res) => {
    let data = req.body
    let filter = {uid: data.uid}
    let option = {upsert: false, new: false}
    let update = {}
    userDB.findOneAndUpdate(filter, update, option, (err,docs) => {
        if (err){
            console.log(err)
            res.render('error')
        }
        else{
            res.render('success')
        }
    })
})

const readLogin = ((req,res) => {
    res.render('login', {
        title: "Login",
        moment: moment,
    })
})

const deleteUser = ((req,res) => {
    let data = req.body
    let filter = {uid: data.uid}
    userDB.findOneAndDelete(filter, (err,docs) => {
        if (err){
            console.log(err)
            res.render('error')
        }
        else{
            res.render('success')
        }
    })
})

module.exports = {
    insertUser,
    readUser,
    updateUser,
    deleteUser,
    //loginUser,
    readLogin,
}