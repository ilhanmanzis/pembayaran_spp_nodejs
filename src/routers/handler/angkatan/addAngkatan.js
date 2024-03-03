import Angkatan from "../../../models/angkatan.js";


const addAngkatan = async(req,res)=>{
    const {name, biaya } = req.body;
    const nameAngkatan = name.toUpperCase();

    // validasi nama angkatan
    if(nameAngkatan===''||nameAngkatan===undefined){
        res.status(400).redirect('/404')
    };

    // validasi biaya angkatan
    if(biaya===undefined||biaya===''){
        res.status(400).redirect('/404')
    }
    
    // validasi nama angkatan sudah ada atau belum
    const dataAngkatan = await Angkatan.findOne({name:nameAngkatan});
    if(dataAngkatan!==null){
        res.status(400).redirect('/404')
    }else{

        const angkatan = new Angkatan({
            name:nameAngkatan,
            biaya:biaya
        });
        await angkatan.save();
        const isSucces = await Angkatan.findOne({name:nameAngkatan});
        if(isSucces !==undefined||isSucces!==null){
            res.status(201).redirect('/angkatan')
        }else{
            res.status(500)
            // .json({
                // status:'fail',
                // message:`Gagal menambahkan data angkatan`
            // });
            .render('error/500')
        }

    }
    
}

export default addAngkatan;