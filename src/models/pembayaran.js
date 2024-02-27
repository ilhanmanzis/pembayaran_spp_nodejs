import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const pembayaranSchema = new Schema({
    nisn:{
        type:Number,
        required:true
    },
    jatuhtempo:{
        type: String,
        required : true
    },
    bulan:{
        type: String,
        required: true
    },
    nobayar:{
        type: String
    },
    tglbayar:{
        type: String
    },
    jumlah:{
        type:Number,
        required : true
    },
    ket:{
        type:String
    }

});

const Pembayaran = mongoose.model('Pembayaran', pembayaranSchema);

export default Pembayaran;