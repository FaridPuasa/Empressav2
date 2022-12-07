const {grantAccess,currentUser} = require ('../controller/user')
let user = currentUser[0]

console.log(user)
const authPage = (permissions)=>{
    return (req,res,next)=>{
        const role = user.role
        console.log(role)
        if (permissions.includes(role)) return next()
        res.render('error', {
            title: '401',
            response: 'Unauthorized',
            message: 'You are not authorized'
        })
    }
}

const authService =  (req,res,next)=>{
    const serviceNumber = parseInt(req.params.number)
    if(user.services.includes(serviceNumber)) return next()
    res.render('error', {
        title: '401',
        response: 'Unauthorized',
        message: 'You are not authorized'
    })
}

module.exports = {
    authPage,
    authService
}