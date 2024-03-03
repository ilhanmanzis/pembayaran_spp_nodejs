import session from "express-session";

const sessionYes = (req,res,next)=>{
    if(req.session.username){
        return res.redirect('/')
    };
    next();
}

export default sessionYes;