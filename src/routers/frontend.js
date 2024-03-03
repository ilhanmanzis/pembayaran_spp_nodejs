import Angkatan from "../models/angkatan.js";
import Jurusan from "../models/jurusan.js";
import Kelas from "../models/kelas.js";
import Siswa from "../models/siswa.js";
import Pembayaran from "../models/pembayaran.js";
import Admin from "../models/admin.js";

import auth from "../session/session.js";
import sessionYes from "../session/sessionYes.js";
import bcrypt from "bcryptjs";

const routers = (app)=>{
    app.get('/', auth, async(req,res)=>{
        const dataUsername = req.session.username;
        const dataTransaksi = await Pembayaran.find({ 
            nobayar:{
            $ne:''
            }
        });
        let totalUang = 0;
        let totalTransaksi = dataTransaksi.length;
        for(let transaksi of dataTransaksi){
            totalUang += transaksi.jumlah;
        }
        res.render('index', {totalTransaksi, totalUang, dataUsername});
    });

    // data angkatan
    app.get('/angkatan', auth, async(req,res)=>{
        const dataUsername = req.session.username;
        const angkatan = await Angkatan.find();
        res.render('angkatan/angkatan', {angkatan, dataUsername});
    });
    app.get('/editdataangkatan/:id', auth, async(req,res)=>{
        const dataUsername = req.session.username;
        const {id} = req.params;
        const angkatan = await Angkatan.findById(id);
        res.render('angkatan/view',{angkatan, dataUsername});
    });

    // data jurusan
    app.get('/jurusan', auth, async(req,res)=>{
        const dataUsername = req.session.username;
        const jurusan = await Jurusan.find();
        res.render('jurusan/jurusan', {jurusan, dataUsername});
    });
    app.get('/editdatajurusan/:id', auth, async(req,res)=>{
        const dataUsername = req.session.username;
        const {id} = req.params;
        const jurusan = await Jurusan.findById(id);
        res.render('jurusan/view', {jurusan, dataUsername});
    });

    // data kelas
    app.get('/kelas', auth, async(req,res)=>{
        const dataUsername = req.session.username;
        const kelass = await Kelas.find();
        res.render('kelas/kelas', {kelass, dataUsername});
    });
    app.get('/editdatakelas/:id', auth, async(req,res)=>{
        const dataUsername = req.session.username;
        const {id} = req.params;
        const kelas = await Kelas.findById(id);
        res.render('kelas/view', {kelas, dataUsername});
    });
    
    // lihat data siswa
    app.get('/datasiswa', auth, async(req,res)=>{
        const dataUsername = req.session.username;
        const siswas = await Siswa.find().populate('angkatan').populate('jurusan').populate('kelas');
        res.render('siswa/datasiswa', {siswas, dataUsername});
    });

    // data siswa
    app.get('/siswa', auth, async(req,res)=>{
        const dataUsername = req.session.username;
        const siswas = await Siswa.find().populate('angkatan').populate('jurusan').populate('kelas');
        const kelass = await Kelas.find();
        const jurusans = await Jurusan.find();
        const angkatans = await Angkatan.find();
        res.render('siswa/siswa', {siswas, kelass, jurusans, angkatans, dataUsername});
    });
    app.get('/editdatasiswa/:id', auth, async(req,res)=>{
        const dataUsername = req.session.username;
        const {id} = req.params;
        const siswa = await Siswa.findById(id).populate('angkatan').populate('jurusan').populate('kelas');
        const kelass = await Kelas.find();
        const jurusans = await Jurusan.find();
        const angkatans = await Angkatan.find();
        res.render('siswa/view', {siswa, kelass, jurusans, angkatans, dataUsername});
    });

    // transaksi spp
    app.get('/pembayaran', auth, async(req,res)=>{
        const dataUsername = req.session.username;
        const {nisn}= req.query;
        const dataSiswa = await Siswa.findOne({nisn:nisn}).populate('angkatan').populate('jurusan').populate('kelas');
        if(dataSiswa !==null){
            const dataPembayaran = await Pembayaran.find({
                siswa:dataSiswa._id
            });
            res.render('pembayaran/pembayaran',{dataPembayaran,dataSiswa, nisn, dataUsername})
        }else{
            const dataPembayaran = await Pembayaran.find({});
            res.render('pembayaran/pembayaran',{dataPembayaran,dataSiswa, nisn, dataUsername})
        }
        
        
    })

    // laporan
    app.get('/laporan', auth, async(req,res)=>{
        const dataUsername = req.session.username;
        res.render('laporan/laporan',{dataUsername})
    });


// login

    app.get('/login', sessionYes, async(req,res)=>{
        res.render('admin/login')
    });

// register
    app.get('/register', sessionYes, async(req,res)=>{
        res.render('admin/register')
    })

// profile admin
    app.get('/profile', auth, async(req,res)=>{
        const dataUsername = req.session.username
        const dataAdmin = await Admin.findOne({
            username: dataUsername
        });
        res.render('admin/profile', {dataAdmin, dataUsername});

    });

// update password admin
    app.get('/updatepassword',auth, async(req,res)=>{
        const dataUsername = req.session.username;
        const dataAdmin = await Admin.findOne({
            username: dataUsername
        });
        res.render('admin/updatePassword', {dataAdmin, dataUsername});
    })

};

export default routers;