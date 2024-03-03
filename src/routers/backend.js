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

const routers = (app)=>{

// data angkatan
    // add data angkatan
    app.post('/angkatan/create', auth, wrapAsync(addAngkatan));

    // delete data angkatan
    app.delete('/angkatan/:id', auth, wrapAsync(deleteAngkatan));

    // get data angkatan berdasarkan id
    app.get('/dataangkatan/:id', auth, wrapAsync(getDataAngkatan));

    // update data angkatan
    app.put('/editdataangkatan/:id', auth, wrapAsync(updateAngkatan));



// data jurusan
    // add data jurusan
    app.post('/jurusan/create', auth, wrapAsync(addJurusan));

    // delete data jurusan
    app.delete('/jurusan/:id', auth, wrapAsync(deleteJurusan));

    // update data jurusan
    app.put('/editdatajurusan/:id', auth, wrapAsync(updateJurusan));



// data kelas
    // add data kelas
    app.post('/kelas/create', auth, wrapAsync(addKelas));

    // delete data kelas
    app.delete('/kelas/:id', auth, wrapAsync(deleteKelas));

    // update data kelas
    app.put('/editdatakelas/:id', auth, wrapAsync(updateKelas));
    

// data siswa
    // add data siswa
    app.post('/siswa', auth, wrapAsync(addSiswa));

    // delete data siswa
    app.delete('/siswa/:id', auth, wrapAsync(deleteSiswa));

    // update data siswa
    app.put('/editdatasiswa/:id', auth, wrapAsync(updateSiswa));


// data transaksi
    // get data pembayaran
    app.get('/datapembayaran', auth, wrapAsync(dataPembayaran));

    // proses transaksi spp
    app.get('/prosestransaksi', auth, wrapAsync(prosesTransaksi));

    // cetak slip transaksi
    app.get('/cetaksliptransaksi', auth, wrapAsync(cetakSlipTransaksi));

    // cetak semua transaksi
    app.get('/cetaksemuatransaksi', auth, wrapAsync(cetakSemuaTransaksi));


// data laporan
    // cetak laporan
    app.post('/cetaklaporan', auth, wrapAsync(cetakLaporan));


// register
    app.post('/register', sessionYes, wrapAsync(register));

// login
    app.post('/login', sessionYes, wrapAsync(login));

// logout
    app.get('/logout', auth, wrapAsync(logout));

// update data admin
    app.put('/updatedataadmin',auth, wrapAsync(updateDataAdmin));

// update passowrd admin 
    app.put('/updatepassword', auth, wrapAsync(updatePassword));

}

export default routers;