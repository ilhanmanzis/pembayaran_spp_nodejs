import Siswa from "../../../models/siswa.js";
import Pembayaran from "../../../models/pembayaran.js";

const dataPembayaran = async(req,res)=>{
    const {nisn} = req.query;
    const dataSiswa = await Siswa.findOne({nisn:nisn}).populate('angkatan').populate('jurusan').populate('kelas');

    if(dataSiswa!==null){
        const dataPembayaran = await Pembayaran.find({
            siswa: dataSiswa._id
        }).populate('siswa');
        res.render('pembayaran/datasiswa', {dataSiswa, dataPembayaran});
    }else{
        res.render('pembayaran/datakosong', {nisn});
    }
}

export default dataPembayaran;