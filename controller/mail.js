const nodemailer = require('nodemailer')
const trasporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "it-support@globex.com.bn",
        pass: "hixxuosmyygxvcpg"
    }
})


const warehouse = require('../models/fmxpod')
const options = {
    from: "it-support@globex.com.bn",
    to: "farid.puasa@globex.com.bn",
    cc: "farid.puasa@globex.com.bn", 
    subject: "New POD Created.",
    text: "......."
}

