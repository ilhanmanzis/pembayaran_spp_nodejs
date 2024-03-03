import Pembayaran from "../../../models/pembayaran.js";
import Siswa from "../../../models/siswa.js";


const prosesTransaksi = async(req,res)=>{
    const {nisn,id}=req.query;

    // validasi data pembayaran
    const dataPembayaran = await Pembayaran.findById(id).populate('siswa');
    if(dataPembayaran===null){
        res.status(404).redirect('/404');
    }
    
    // proses bayar

    const tglBayar = new Date().toISOString().slice(0, 10);
    const noBayar = Math.floor(Math.random() * 900000000)+100000000;
    if(dataPembayaran.nobayar===''){    
        const bayar = {
            siswa:dataPembayaran.siswa,
            jatuhtempo:dataPembayaran.jatuhtempo,
            bulan:dataPembayaran.bulan,
            jumlah:dataPembayaran.jumlah,
            nobayar:noBayar,
            tglbayar:tglBayar,
            ket:'LUNAS'
        };
        const databayar = await Pembayaran.findByIdAndUpdate(id,bayar);
        const isSucces = await Pembayaran.find({nobayar:noBayar});
        if(isSucces !==null){
            res.status(200).redirect(`/pembayaran?nisn=${dataPembayaran.siswa.nisn}`)
        }else{
            console.error(databayar);
            res.status(500).render('error/500')
        }
    }
    // proses batal
    else{
        const batalBayar = {
            siswa:dataPembayaran.siswa,
            jatuhtempo:dataPembayaran.jatuhtempo,
            bulan:dataPembayaran.bulan,
            jumlah:dataPembayaran.jumlah,
            nobayar:'',
            tglbayar:'',
            ket:''
        };
        const dataBatal = await Pembayaran.findByIdAndUpdate(id,batalBayar);
        const isSuccesBatal = await Pembayaran.findOne({nobayar:noBayar});
        if(isSuccesBatal === null|| isSuccesBatal === undefined){
            res.status(200).redirect(`/pembayaran?nisn=${dataPembayaran.siswa.nisn}`)
        }else{
            res.status(500).render('error/500')
        }
    }
}

export default prosesTransaksi;