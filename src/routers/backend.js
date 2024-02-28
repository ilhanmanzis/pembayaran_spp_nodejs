import wrapAsync from "../../server.js";

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

const routers = (app)=>{

// data angkatan
    // add data angkatan
    app.post('/angkatan/create',wrapAsync(addAngkatan));

    // delete data angkatan
    app.delete('/angkatan/:id',wrapAsync(deleteAngkatan));

    // get data angkatan berdasarkan id
    app.get('/dataangkatan/:id',wrapAsync(getDataAngkatan));

    // update data angkatan
    app.put('/editdataangkatan/:id',wrapAsync(updateAngkatan));



// data jurusan
    // add data jurusan
    app.post('/jurusan/create',wrapAsync(addJurusan));

    // delete data jurusan
    app.delete('/jurusan/:id',wrapAsync(deleteJurusan));

    // update data jurusan
    app.put('/editdatajurusan/:id',wrapAsync(updateJurusan));



// data kelas
    // add data kelas
    app.post('/kelas/create',wrapAsync(addKelas));

    // delete data kelas
    app.delete('/kelas/:id',wrapAsync(deleteKelas));

    // update data kelas
    app.put('/editdatakelas/:id',wrapAsync(updateKelas));
    

// data siswa
    // add data siswa
    app.post('/siswa',wrapAsync(addSiswa));

    // delete data siswa
    app.delete('/siswa/:id',wrapAsync(deleteSiswa));

    // update data siswa
    app.put('/editdatasiswa/:id',wrapAsync(updateSiswa));


// data transaksi
    // get data pembayaran
    app.get('/datapembayaran',wrapAsync(dataPembayaran));

    // proses transaksi spp
    app.get('/prosestransaksi',wrapAsync(prosesTransaksi));

    // cetak slip transaksi
    app.get('/cetaksliptransaksi',wrapAsync(cetakSlipTransaksi));

    // cetak semua transaksi
    app.get('/cetaksemuatransaksi',wrapAsync(cetakSemuaTransaksi));


// data laporan
    // cetak laporan
    app.post('/cetaklaporan',wrapAsync(cetakLaporan));


}

export default routers;