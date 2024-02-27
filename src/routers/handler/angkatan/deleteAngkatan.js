import Angkatan from "../../../models/angkatan.js";

const deleteAngkatan = async(req,res)=>{
    const {id} = req.params;
    const dataAngkatan = await Angkatan.findById(id);
    if(dataAngkatan===null){
        res.status(404).render('error/404');
    };

    await Angkatan.findByIdAndDelete(id);
    const isSucces = await Angkatan.findById(id);
    if(isSucces===null||isSucces===undefined){
        res.status(200).redirect('/angkatan');
    }else{
        res.status(500).render('error/500');
    }
    
}

export default deleteAngkatan;