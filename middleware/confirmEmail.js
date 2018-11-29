module.exports = (redirectTo = "/") => (req,res,next) => {

    if (req.user.status==="Active"){
        next();
    }else {
        res.redirect(redirectTo)
    }
}