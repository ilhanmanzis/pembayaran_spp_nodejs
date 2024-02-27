import Angkatan from "../../../models/angkatan.js";


const addAngkatan = async(req,res)=>{
    const {name, biaya } = req.body;
    const nameJurusan = name.toUpperCase();

    // validasi nama angkatan
    if(nameJurusan===''||nameJurusan===undefined){
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
    const dataAngkatan = await Angkatan.findOne({name:nameJurusan});
    if(dataAngkatan!==null){
        res.status(400)
        // .json({
        //     status:'fail',
        //     message:`Gagal menambahkan data angkatan, data angkatan ${name} sudah ada`})
        .render('error/404')
    }else{

        const angkatan = new Angkatan({
            name:nameJurusan,
            biaya:biaya
        });
        await angkatan.save();
        const isSucces = await Angkatan.findOne({name:nameJurusan});
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