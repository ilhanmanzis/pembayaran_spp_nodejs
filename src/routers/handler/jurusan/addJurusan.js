import Jurusan from "../../../models/jurusan.js";

const addJurusan = async(req,res)=>{
    const {name} = req.body;
    const nameJurusan = name.toUpperCase();
    console.log(nameJurusan)
    // validasi nama jurusan
    if(nameJurusan === ''||nameJurusan===undefined){
        res.status(400).render('error/404');
    }

    // validasi nama jurusan apakah ada atau tidak
    const dataJurusan = await Jurusan.findOne({name:nameJurusan});
    if(dataJurusan!==null){
        res.status(400).render('error/404');
    }else{
        const jurusan = new Jurusan({
            name:nameJurusan
        });
        await jurusan.save();
        const isSucces = await Jurusan.findOne({name:nameJurusan});
        if(isSucces!==undefined||isSucces!==null){
            res.status(200).redirect('/jurusan');
        }else{
            res.status(500).render('error/500');
        }
    }
}

export default addJurusan;