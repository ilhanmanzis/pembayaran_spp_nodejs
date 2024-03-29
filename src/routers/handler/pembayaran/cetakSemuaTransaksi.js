import Siswa from "../../../models/siswa.js";
import Pembayaran from "../../../models/pembayaran.js";

const cetakSemuaTransaksi = async(req,res)=>{
    const {nisn} = req.query;

    const dataSiswa = await Siswa.findOne({nisn:nisn}).populate('angkatan').populate('jurusan').populate('kelas');
    // validasi data siswa
    if(dataSiswa===null){
        res.status(404).redirect('/404')
    }

    const dataPembayaran = await Pembayaran.find({siswa:dataSiswa._id, ket:'LUNAS'});
    if(dataPembayaran.length == 0){
        res.status(404).redirect('/404')
    }

    res.status(200).render('pembayaran/cetakSemuaTransaksi',{dataSiswa,dataPembayaran});

}

export default cetakSemuaTransaksi;