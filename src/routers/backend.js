import express from"express";
import wrapAsync from "../../server.js";
import auth from "../session/session.js";
import sessionYes from "../session/sessionYes.js";

// data angkatan
import addAngkatan from "./handler/angkatan/addAngkatan.js";
import deleteAngkatan from "./handler/angkatan/deleteAngkatan.js";
import getDataAngkatan from "./handler/angkatan/getDataAngkatan.js";
import updateAngkatan from "./handler/angkatan/updateAngkatan.js";

// data jurusan
import addJurusan from "./handler/jurusan/addJurusan.js";
import deleteJurusan from "./handler/jurusan/deleteJurusan.js";
import updateJurusan from "./handler/jurusan/updateJurusan.js";

//data kelas
import addKelas from "./handler/kelas/addKelas.js";
import deleteKelas from "./handler/kelas/deleteKelas.js";
import updateKelas from "./handler/kelas/updateKelas.js";

// data siswa
import addSiswa from "./handler/siswa/addSiswa.js";
import deleteSiswa from "./handler/siswa/deleteSiswa.js";
import updateSiswa from "./handler/siswa/updateSiswa.js";

// data transaksi
import dataPembayaran from "./handler/pembayaran/dataPembayaran.js";
import prosesTransaksi from "./handler/pembayaran/prosesTransaksi.js";
import cetakSlipTransaksi from "./handler/pembayaran/cetakSlipTransaksi.js";
import cetakSemuaTransaksi from "./handler/pembayaran/cetakSemuaTransaksi.js";

// laporan
import cetakLaporan from "./handler/laporan/cetakLaporan.js";

// register
import register from "./handler/register/register.js";

// login
import login from "./handler/login/login.js";

// logout
import logout from "./handler/logout/logout.js";

// admin
import updateDataAdmin from "./handler/admin/updateDataAdmin.js";
import updatePassword from "./handler/admin/updatePassword.js";
const router = express.Router();


// data angkatan
    // add data angkatan
    router.post('/angkatan/create', auth, wrapAsync(addAngkatan));

    // delete data angkatan
    router.delete('/angkatan/:id', auth, wrapAsync(deleteAngkatan));

    // get data angkatan berdasarkan id
    router.get('/dataangkatan/:id', auth, wrapAsync(getDataAngkatan));

    // update data angkatan
router.put('/editdataangkatan/:id', auth, wrapAsync(updateAngkatan));



// data jurusan
    // add data jurusan
    router.post('/jurusan/create', auth, wrapAsync(addJurusan));

    // delete data jurusan
    router.delete('/jurusan/:id', auth, wrapAsync(deleteJurusan));

    // update data jurusan
    router.put('/editdatajurusan/:id', auth, wrapAsync(updateJurusan));



// data kelas
    // add data kelas
    router.post('/kelas/create', auth, wrapAsync(addKelas));

    // delete data kelas
    router.delete('/kelas/:id', auth, wrapAsync(deleteKelas));

    // update data kelas
    router.put('/editdatakelas/:id', auth, wrapAsync(updateKelas));
    

// data siswa
    // add data siswa
    router.post('/siswa', auth, wrapAsync(addSiswa));

    // delete data siswa
    router.delete('/siswa/:id', auth, wrapAsync(deleteSiswa));

    // update data siswa
    router.put('/editdatasiswa/:id', auth, wrapAsync(updateSiswa));


// data transaksi
    // get data pembayaran
    router.get('/datapembayaran', auth, wrapAsync(dataPembayaran));

    // proses transaksi spp
    router.get('/prosestransaksi', auth, wrapAsync(prosesTransaksi));

    // cetak slip transaksi
    router.get('/cetaksliptransaksi', auth, wrapAsync(cetakSlipTransaksi));

    // cetak semua transaksi
    router.get('/cetaksemuatransaksi', auth, wrapAsync(cetakSemuaTransaksi));


// data laporan
    // cetak laporan
    router.post('/cetaklaporan', auth, wrapAsync(cetakLaporan));


// register
    router.post('/register', sessionYes, wrapAsync(register));

// login
     router.post('/login', sessionYes, wrapAsync(login));

// logout
    router.get('/logout', auth, wrapAsync(logout));

// update data admin
    router.put('/updatedataadmin',auth, wrapAsync(updateDataAdmin));

// update passowrd admin 
    router.put('/updatepassword', auth, wrapAsync(updatePassword));


export default router;
