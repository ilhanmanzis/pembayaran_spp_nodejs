import Siswa from "../../../models/siswa.js";
import Pembayaran from "../../../models/pembayaran.js";

const cetakSlipTransaksi = async(req,res)=>{
    const {nisn, id} = req.query;

    const dataSiswa = await Siswa.findOne({nisn:nisn}).populate('angkatan').populate('jurusan').populate('kelas');

    // validasi data siswa
    if(dataSiswa===null){
        res.status(404).redirect('/404')
    }

    const dataPembayaran = await Pembayaran.findById(id);
    if(dataPembayaran===null){
        res.status(404).redirect('/404')
    }

    res.status(200).render('pembayaran/cetakSlipTransaksi',{dataSiswa,dataPembayaran});

}

export default cetakSlipTransaksi;