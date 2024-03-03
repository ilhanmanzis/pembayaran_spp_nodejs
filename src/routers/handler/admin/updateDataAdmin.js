import Admin from "../../../models/admin.js";

const updateDataAdmin = async(req,res)=>{
    try {
        const {id,firstName,lastName,username,email} = req.body;
    
        // validasi data kosong
        if(firstName==='' ||  lastName==='' ||  username==='' ||  email===''){
            res.status(404).redirect('/404');
        };
    
        await Admin.findByIdAndUpdate(id, {
            firstName:firstName,
            lastName:lastName,
            username:username,
            email:email
        });
    
        const isSucces = await Admin.findOne({
            firstName:firstName,
            lastName:lastName,
            username:username,
            email:email
        });
    
        if(isSucces !==null){
            res.status(201).redirect('/profile');
        }else{
            res.status(500).render('error/500');
        }
        
    } catch (error) {
        console.error(error)
    }
}

export default updateDataAdmin;