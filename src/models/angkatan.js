import mongoose from "mongoose";
import { Schema } from "mongoose";

const angkatanSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    biaya:{
        type:Number,
        required:true
    }
});

const Angkatan = mongoose.model('Angkatan', angkatanSchema);
export default Angkatan;