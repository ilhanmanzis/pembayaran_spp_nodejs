import Kelas from "../../../models/kelas.js";

const deleteKelas = async(req,res)=>{
    const {id} = req.params;

    const dataKelas = await Kelas.findById(id);
    
    // validasi data kelas
    if(dataKelas === null || dataKelas === undefined){
        res.status(404).redirect('/404')
    }

    // menghapus data kelas
    await Kelas.findByIdAndDelete(id);
    const isSucces = await Kelas.findById(id);
    if(isSucces === null || isSucces=== undefined){
        res.status(200).redirect('/kelas')
    }else{
        res.status(500).render('error/500')
    }
};

export default deleteKelas;