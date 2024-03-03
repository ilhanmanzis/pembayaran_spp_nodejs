import Angkatan from "../../../models/angkatan.js";

const updateAngkatan = async(req,res)=>{
    const {id} = req.params;
    const {name, biaya} = req.body;
    const nameAngkatan = name.toUpperCase()
    // validasi nama 
    if(nameAngkatan===''||nameAngkatan===undefined){
        res.status(400).json({
            status:'fail',
            message:'Gagal menambahkan data angkatan, mohon isi nama angkatan'
        });
        res.render('error/404')
    };

    // validasi biaya angkatan
    if(biaya===undefined||biaya===''){
        res.status(400).json({
            status:'fail',
            message:'Gagal menambahkan biaya angkatan, mohon isi biaya angkatan'
        });
        res.render('error/404')
    }

    // validasi nama angkatan sudah ada atau belum
    const dataAngkatan = await Angkatan.findOne({name:nameAngkatan});
    if(dataAngkatan!==null){
        res.status(400).redirect('/404')
    }else{
        await Angkatan.findByIdAndUpdate(id, {
            name:nameAngkatan,
            biaya:biaya
        });
        const isSucces = await Angkatan.findOne({
            name:nameAngkatan,
            biaya:biaya
        });
        if(isSucces===null||isSucces===undefined){
            res.status(500).render('error/500');
        }else{
            res.status(200).redirect('/angkatan');
        }
    }
}

export default updateAngkatan;