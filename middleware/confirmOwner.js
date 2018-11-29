const Event = require("../models/Events")
module.exports = (redirectTo = "/event/stop") => (req,res,next) => {
    Event.findById(req.params.id)
    .then(event => {
        if (event && event.join_us[0].toString() == req.user._id.toString()){
            next();
        }else {
            res.redirect(redirectTo)
        }    
    })
}