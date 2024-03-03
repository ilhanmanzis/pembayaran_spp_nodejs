import Siswa from "../../../models/siswa.js";

const deleteSiswa = async(req,res)=>{
    const {id} = req.params;

    // validasi data siswa
    const dataSiswa = await Siswa.findById(id);
    if(dataSiswa === null || dataSiswa === undefined){
        res.status(404).redirect('/404')
    }

    // menghapus data siswa
    await Siswa.findByIdAndDelete(id);
    const isSucces = await Siswa.findById(id);
    if(isSucces === null){
        res.status(200).redirect('/siswa');
    }else{
        res.status(500).render('error/500');
    }
}

export default deleteSiswa;