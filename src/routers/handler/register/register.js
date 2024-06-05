import bcrypt from "bcryptjs";
import Admin from "../../../models/admin.js";
const register = async(req,res)=>{
    const {firstName, lastName, username, email, password} = req.body;

    // validasi data kosong
    if(firstName==='' ||  lastName==='' ||  username==='' ||  email==='' ||  password===''){
        res.status(404).render('error/404');
    };

    // validasi apakah username sudah ada
    const dataUsername = await Admin.findOne({
        username:username
    });

    if(dataUsername){
        res.status(404).render('error/404');
    }

    // validasi apakah email sudah ada
    const dataEmail = await Admin.findOne({
        email:email
    });
    if(dataEmail){
        res.status(404).redirect('/404');
    }

    // hash password

    const hashPassword = bcrypt.hashSync(password, 10);

    // menambahkan data ke database
    const dataAdmin = new Admin ({
        firstName:firstName,
        lastName:lastName,
        username:username,
        email:email,
        password:hashPassword
    });
    await dataAdmin.save();

    const isSucces = await Admin.findOne({username:username});
    if(isSucces!==null){
        res.status(201).redirect('/login');
    }else{
        res.render('error/500')
    }
}

export default register;