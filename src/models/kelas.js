import mongoose from "mongoose";
import { Schema } from "mongoose";

const kelasSchema = new Schema({
    name:{
        type:String,
        required:true
    }
});

const Kelas = mongoose.model('Kelas', kelasSchema);
export default Kelas;