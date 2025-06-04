import mongoose from "mongoose";


const sellerSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
  password: String, // hash in production!
  phone: String,
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;