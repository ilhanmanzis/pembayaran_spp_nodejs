import Angkatan from "../../../models/angkatan.js";
import Jurusan from "../../../models/jurusan.js";
import Kelas from "../../../models/kelas.js";
import Pembayaran from "../../../models/pembayaran.js";
import Siswa from "../../../models/siswa.js";

const addSiswa = async(req,res)=>{
    const {name, angkatan, jurusan, kelas, alamat}=req.body;
    const nameSiswa = name.toUpperCase();
    const angkatanSiswa = angkatan.toUpperCase();
    const jurusanSiswa = jurusan.toUpperCase();
    const kelasSiswa = kelas.toUpperCase();
    const alamatSiswa = alamat.toUpperCase();

    // validasi data tidak kosong
    if(nameSiswa === '' ||
        angkatanSiswa==='' ||
        jurusanSiswa==='' ||
        kelasSiswa==='' ||
        alamatSiswa===''){
            res.status(404).render('error/404');
    }

    const dataAngkatan = await Angkatan.findOne({name:angkatanSiswa});
    const dataJurusan = await Jurusan.findOne({name:jurusanSiswa});
    const dataKelas = await Kelas.findOne({name:kelasSiswa});
    const nisn = Math.floor(Math.random() * 900000000) +100000000;
    const siswa = new Siswa({
        nisn:nisn,
        name:nameSiswa,
        angkatan:dataAngkatan,
        jurusan:dataJurusan,
        kelas:dataKelas,
        alamat:alamatSiswa
    });
    await siswa.save();


    // format bulan indonesia 
    const bulanIndo = {
        '1': 'Januari',
        '2': 'Februari',
        '3': 'Maret',
        '4': 'April',
        '5': 'Mei',
        '6': 'Juni',
        '7': 'Juli',
        '8': 'Agustus',
        '9': 'September',
        '10': 'Oktober',
        '11': 'November',
        '12': 'Desember'
    };
    
    const isSucces = await Siswa.findOne({nisn:nisn});
    if(isSucces !== null){

        // menambahkan pembayaran spp pada siswa 
        const awalTempo = new Date().toISOString().slice(0, 10);
        for(let i = 1; i<=36;i++){
            const jatuhTempo = new Date(new Date(awalTempo).setMonth(new Date(awalTempo).getMonth()+i));
            const bulan = bulanIndo[`${jatuhTempo.getMonth()}`] + " " + jatuhTempo.getFullYear();

            const pembayaran = new Pembayaran({
                nisn:nisn,
                jatuhtempo:jatuhTempo.toISOString().slice(0, 10),
                bulan:bulan,
                jumlah:dataAngkatan.biaya,
                nobayar:'',
                tglbayar:'',
                ket:''
            });
            await pembayaran.save()
        }
        const isSuccesPembayaran = await Pembayaran.find({nisn:nisn})
        if(isSuccesPembayaran !== null){
            console.log('add siswa success')
            res.status(201).redirect('/siswa');
        }else{
            res.status(200).render('error/500')
        }
    }else{
        res.status(500).render('error/500')
    }
};

export default addSiswa;