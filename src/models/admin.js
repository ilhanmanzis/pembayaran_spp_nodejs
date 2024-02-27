import mongoose from "mongoose";
import { Schema } from "mongoose";

const adminSchema = new Schema({
    username: Any,
    password: Any
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin