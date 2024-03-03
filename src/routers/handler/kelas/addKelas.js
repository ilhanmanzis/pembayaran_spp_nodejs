import Kelas from "../../../models/kelas.js";

const addKelas = async(req,res)=>{
    const {name} = req.body;
    const nameKelas = name.toUpperCase();
    
    // validasi nama kelas
    if(nameKelas===''||nameKelas===null){
        
       res.status(404).render('error/404');
        
    }

    // validasi nama kelas apakah ada atau tidak
    const dataKelas = await Kelas.findOne({name:nameKelas});
    if(dataKelas !== null){
        res.status(404).redirect('/404')
    }else{
        // menambah data kelas
        const kelas = new Kelas({
            name:nameKelas
        });
        await kelas.save();
        const isSucces = await Kelas.findOne({name:nameKelas});
        if(isSucces !== null || isSucces !== undefined){
            res.status(201).redirect('/kelas');
        }else{
            res.status(500).render('error/500');
        }
    }
};

export default addKelas;