import Pembayaran from "../../../models/pembayaran.js";

const cetakLaporan = async(req,res)=>{
    const {awal, akhir} = req.body;

    if(awal===''||akhir===''){
        res.status(404).redirect('/404')
    };

    const laporan = await Pembayaran.find({
        tglbayar:{
            $gte: awal,
            $lte: akhir
        },
        nobayar:{
            $ne:''
        }
    }).populate({
        path: 'siswa',
        populate: [
            { path: 'kelas' }
        ]
    });
    res.status(200).render('laporan/cetaklaporan', {laporan, awal, akhir});
}

export default cetakLaporan;