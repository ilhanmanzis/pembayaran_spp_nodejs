import session from "express-session";

const auth = (req,res,next)=>{
    if(!req.session.username){
        return res.redirect('/login');
    }
    next();
}


export default auth;