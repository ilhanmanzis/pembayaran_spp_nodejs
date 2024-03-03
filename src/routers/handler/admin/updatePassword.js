import Admin from "../../../models/admin.js";
import bcrypt from "bcryptjs";

const updatePassword = async(req,res)=>{
    const {id,password} = req.body;

    // validasi Passowrd kosong
    if(password==''){
        res.status(404).redirect('/404');
    }

    try {
        const hashPassword = bcrypt.hashSync(password, 10);
        await Admin.findByIdAndUpdate(id,{
            password:hashPassword
        });
        res.redirect('/updatepassword');
    } catch (error) {
        console.error(error);
        res.status(500).redirect('error/500');
    }
}

export default updatePassword;