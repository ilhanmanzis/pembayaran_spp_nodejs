const getDataAngkatan = async(req,res)=>{
    const {id} = req.params;
    const angkatan = await Angkatan.findById(id);
    if(angkatan!==null||angkatan!==undefined){
        res.status(200).send(angkatan);
    }else{
        res.status(404).render('error/404');
    }
}

export default getDataAngkatan;