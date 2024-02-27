import Angkatan from "../models/angkatan.js";
import Jurusan from "../models/jurusan.js";
import Kelas from "../models/kelas.js";
import Siswa from "../models/siswa.js";
import Pembayaran from "../models/pembayaran.js";

const routers = (app)=>{
    app.get('/',(req,res)=>{
        res.render('index');
    });

    // data angkatan
    app.get('/angkatan',async(req,res)=>{
        const angkatan = await Angkatan.find();
        res.render('angkatan/angkatan', {angkatan});
    });
    app.get('/editdataangkatan/:id',async(req,res)=>{
        const {id} = req.params;
        const angkatan = await Angkatan.findById(id);
        res.render('angkatan/view',{angkatan});
    });

    // data jurusan
    app.get('/jurusan',async(req,res)=>{
        const jurusan = await Jurusan.find();
        res.render('jurusan/jurusan', {jurusan});
    });
    app.get('/editdatajurusan/:id',async(req,res)=>{
        const {id} = req.params;
        const jurusan = await Jurusan.findById(id);
        res.render('jurusan/view', {jurusan});
    });

    // data kelas
    app.get('/kelas',async(req,res)=>{
        const kelass = await Kelas.find();
        res.render('kelas/kelas', {kelass});
    });
    app.get('/editdatakelas/:id',async(req,res)=>{
        const {id} = req.params;
        const kelas = await Kelas.findById(id);
        res.render('kelas/view', {kelas});
    });
    
    // lihat data siswa
    app.get('/datasiswa',async(req,res)=>{
        const siswas = await Siswa.find().populate('angkatan').populate('jurusan').populate('kelas');
        res.render('siswa/datasiswa', {siswas});
    });

    // data siswa
    app.get('/siswa',async(req,res)=>{
        const siswas = await Siswa.find().populate('angkatan').populate('jurusan').populate('kelas');
        const kelass = await Kelas.find();
        const jurusans = await Jurusan.find();
        const angkatans = await Angkatan.find();
        res.render('siswa/siswa', {siswas, kelass, jurusans, angkatans});
    });
    app.get('/editdatasiswa/:id',async(req,res)=>{
        const {id} = req.params;
        const siswa = await Siswa.findById(id).populate('angkatan').populate('jurusan').populate('kelas');
        const kelass = await Kelas.find();
        const jurusans = await Jurusan.find();
        const angkatans = await Angkatan.find();
        res.render('siswa/view', {siswa, kelass, jurusans, angkatans});
    });

    // transaksi spp
    app.get('/pembayaran',async(req,res)=>{
        const {nisn}= req.query;
        const dataSiswa = await Siswa.findOne({nisn:nisn}).populate('angkatan').populate('jurusan').populate('kelas');
        const dataPembayaran = await Pembayaran.find({nisn:nisn});
        res.render('pembayaran/pembayaran',{dataPembayaran,dataSiswa, nisn})
    })

    // laporan
    app.get('/laporan',async(req,res)=>{
        res.render('laporan/laporan')
    })

    app.get('/login',async(req,res)=>{
        res.render('admin/login')
    });
    app.get('/register',async(req,res)=>{
        res.render('admin/register')
    })

};

export default routers;