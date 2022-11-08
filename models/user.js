const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const moment = require('moment');
const res = require("express/lib/response");


const reqString = {
    type: String,
    require: true,
}

let date = moment().format('DD/MM/YYYY')

const userSchema  = new mongoose.Schema({
    name: reqString,
    uid: {type:String, required:true, unique:true},
    password: reqString,
    access: reqString,
    email: reqString,
    contact: reqString,
    role: reqString,
    service: {type: [String]},
    firsttime: reqString,
    dateCreate: {type: Date, default: date},
})

userSchema.statics.authenticate = function(uid, password, callback){
    console.log("Mongo UID: " + uid)
    user.findOne({
        uid
    }).exec(function(error,user){
        console.log(user)
        if(error){
            console.log(error)
        } else if(!user){
            var err = new Error("user not found");
            err.status = 401;
            console.log(err);
        }// if user exists
        bcrypt.compare(password, user.password, function(error,result){
            if(result === true){
                return callback(null, user);
            } else {
                return callback()
            }
        })
    })
}

userSchema.pre("save", function(next){
    const user  = this;
    bcrypt.hash(user.password, 10,(err, hash)=>{
        if(err){
            return next();
        }
        user.password = hash;
        next();
    });
});

const user = mongoose.model("user", userSchema); 

module.exports = user

