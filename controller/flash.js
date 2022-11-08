const flashmessage = (req,res) =>{
    const successFlashMessageArr = req.flash('success');
    const errorFlashMessageArr = req.flash('error');
    res.locals.successFlashMessage = successFlashMessageArr[0];
    res.locals.errorFlashMessage = errorFlashMessageArr[0];
    next();
}

module.exports={
    flashmessage
}