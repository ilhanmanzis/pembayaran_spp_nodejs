import Jurusan from "../../../models/jurusan.js";

const updateJurusan = async(req,res)=>{
    const {id} = req.params;
    const {name} =req.body;
    const nameJurusan = name.toUpperCase();
    console.log(nameJurusan)

    // validasi nama jurusan
    if(nameJurusan===''||nameJurusan===null){
        res.status(404).render('error/404');
    }
    
    // validasi nama jurusan apakah ada atau tidak
    const dataJurusan = await Jurusan.findOne({name:nameJurusan});

    if(dataJurusan!==null){
        res.status(404).render('error/404');
    }else{
        await Jurusan.findByIdAndUpdate(id, {
            name:nameJurusan
        });
        const isSucces = await Jurusan.findOne({name:nameJurusan});
        if(isSucces!==null){
            res.status(201).redirect('/jurusan')
        }else{
            res.status(500).render('error/500');
        }
    }
}

export default updateJurusan