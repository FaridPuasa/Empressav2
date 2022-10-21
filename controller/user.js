const userDB = require('../models/user')
const moment = require('moment')
const bcrypt = require('bcrypt')
const flash = require('connect-flash')

const insertUser = ((req,res) => {
    let data = req.body
    let name = data.name
    let ic = data.icNumber
    let user = new userDB ({
        name: data.name,
        password: data.password, //auto generated
        position: data.position, //admin,GRP,Warehouse,CS,Dispatch
        staffNumber: data.staffNumber,
        email: data.email,
        contact: data.contact,
        office: data.office,
        firstTime: "TRUE",
        create: data.create,
        update: data.update,
        delete: data.delete,
        pod: data.pod,
        inventory: data.pod,
    })
    user.save((err) => {
        if (err){
            console.log(err)
            res.render('error')
        }else {
            res.render ('success', {
                head: "Account Created",
                message: `Account for user ${name} successfuly created. Login ID ${ic}.`,
            })
        }
    })
})

const loginUser = ((req,res) => {
    let data = req.body
    let icNumber = data.icNumber
    let password = data.password

    console.log(req.sessionID)
    userDB.authenticate(icNumber, password, (err,user) =>{
        if (req.session.authenticated){
            console.log(req.session)
        }
        else{
            if (user) {
                req.session.authenticated = true
                req.session.user = user
                let currentUser = user
                console.log(currentUser)

                let firstTime = user.firstTime
                let position = user.position
                console.log(firstTime)
                if (firstTime === "TRUE") {
                    res.render('changepassword', {icNumber: icNumber})
                }
                else if (firstTime === "FALSE") {
                    res.render('dashboard',{
                        id: user._id,
                        name: user.name,
                        icNumber: user.icNumber,
                        position: user.position,
                        contact: user.contact,
                        office: user.office,
                        position: user.position
                    })
                }
                else{
                    console.log("Failed to detect user status [Firsttimer == undefined]")
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

const readUser = ((req,res) => {
    let filter = {}
    userDB.find(filter, (err,result) => {
        if (err){
            console.log(err)
            res.render('error')
        }
        else{
            res.render('userlist')
        }
    })
})

const updateUser = ((req,res) => {
    let data = req.body
    let filter = {staffNumber: data.staffNumber}
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
    let filter = {staffNumber: data.staffNumber}
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
    loginUser,
    readLogin,

}