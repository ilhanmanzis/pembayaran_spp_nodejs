import mongoose from "mongoose";
import { Schema } from "mongoose";

const siswaSchema = new Schema({
    nisn:{
        type:Number,
        required:[true, 'nisn tidak boleh kosong']
    },
    name:{
        type:String,
        required:[true,'name tidak boleh kosong'],
    },
    angkatan:{
        type: Schema.Types.ObjectId,
        ref: 'Angkatan'
    },
    jurusan:{
        type:Schema.Types.ObjectId,
        ref: 'Jurusan'
    },
    kelas:{
        type: Schema.Types.ObjectId,
        ref: 'Kelas'
    },
    alamat:{
        type:String,
        required:[true, 'Alamat tidak boleh kosong']
    }

});

const Siswa = mongoose.model('Siswa', siswaSchema);

export default Siswa;