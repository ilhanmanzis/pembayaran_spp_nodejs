import Kelas from "../../../models/kelas.js";

const updateKelas = async(req,res)=>{
    const {id} = req.params;
    const {name} = req.body;
    const nameKelas = name.toUpperCase();

    // validasi nama kelas
    if(nameKelas === ''||nameKelas===null){
        res.status(404).render('error/404');
    };

    // validasi nama kelas apakah ada atau tidak
    const dataKelas = await Kelas.findOne({name:nameKelas});
    if(dataKelas !== null ){
        console.log(dataKelas)
        res.status(404).redirect('/404')
    }else{
        await Kelas.findByIdAndUpdate(id, {
            name:nameKelas
        });
        const isSucces = await Kelas.findOne({name:nameKelas});
        if(isSucces !== null || isSucces !== undefined){
            res.status(201).redirect('/kelas')
        }else{
            res.status(500).render('error/500')
        }
    }
};

export default updateKelas;