const authPage = (permissions)=>{
    return (req,res,next)=>{
        const userRole = req.body.userRole
        if (permissions.includes(userRole)) return next()
        res.render('error', {
            title: '401',
            response: 'Unauthorized',
            message: 'You are not authorized'
        })
    }
}

const authService =  (req,res,next)=>{
    const serviceNumber = parseInt(req.params.number)
    if(req.body.services.includes(serviceNumber)) return next()
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