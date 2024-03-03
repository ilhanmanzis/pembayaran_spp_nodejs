import session from "express-session"

const logout = async(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}

export default logout;