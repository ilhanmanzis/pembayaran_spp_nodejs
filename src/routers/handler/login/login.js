import bcrypt from "bcryptjs";
import Admin from "../../../models/admin.js";

const login = async(req,res)=>{
    const {username, password} = req.body;

    // validasi data kosong
    if(username==='' ||  password===''){
        res.status(404).redirect('/404')
    };

    const dataAdmin = await Admin.findOne({
        username:username
    });
    if(dataAdmin){
        const dataPassword = bcrypt.compareSync(password, dataAdmin.password);

        if(dataPassword){
            req.session.username = username;
            res.status(200).redirect('/');
        }else{
            res.status(404).redirect('/login')
        }
    }else{
        res.status(404).redirect('/login')
    }
}

export default login;