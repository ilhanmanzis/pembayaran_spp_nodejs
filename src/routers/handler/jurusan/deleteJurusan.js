import Jurusan from "../../../models/jurusan.js";

const deleteJurusan = async(req,res)=>{
    const {id} = req.params;

    // validasi data jurusan
    const dataJurusan = await Jurusan.findById(id);
    if(dataJurusan===null||dataJurusan===undefined){
        res.status(404).redirect('/404')
    }

    await Jurusan.findByIdAndDelete(id);
    const isSucces = await Jurusan.findById(id);
    if(isSucces===null||isSucces===undefined){
        res.status(200).redirect('/jurusan');
    }else{
        res.status(500).render('error/500');
    }
}

export default deleteJurusan;