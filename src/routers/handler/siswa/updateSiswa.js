import Siswa from "../../../models/siswa.js";
import Angkatan from "../../../models/angkatan.js";
import Jurusan from "../../../models/jurusan.js";
import Kelas from "../../../models/kelas.js";

const updateSiswa = async(req,res)=>{
    const {id} = req.params;
    const {nisn, name, angkatan, jurusan, kelas, alamat} = req.body;
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
            res.status(404).redirect('/404')
    }


    const dataAngkatan = await Angkatan.findOne({name:angkatanSiswa});
    const dataJurusan = await Jurusan.findOne({name:jurusanSiswa});
    const dataKelas = await Kelas.findOne({name:kelasSiswa});
    const siswa = {
        nisn:nisn,
        name:nameSiswa,
        angkatan:dataAngkatan,
        jurusan:dataJurusan,
        kelas:dataKelas,
        alamat:alamatSiswa
    }
    await Siswa.findByIdAndUpdate(id, siswa);
    const isSucces = await Siswa.findOne({
        nisn:nisn,
        name:nameSiswa,
        angkatan:dataAngkatan,
        jurusan:dataJurusan,
        kelas:dataKelas,
        alamat:alamatSiswa
    });
    if(isSucces !== null){
        res.status(201).redirect('/siswa');
    }else{
        res.status(500).render('error/500')
    }
}

export default updateSiswa;