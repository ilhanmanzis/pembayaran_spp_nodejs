import mongoose from "mongoose";
import { Schema } from "mongoose";

const jurusanSchema = new Schema({
    name:{
        type:String,
        required:true
    }
});

const Jurusan = mongoose.model('Jurusan', jurusanSchema);
export default Jurusan;