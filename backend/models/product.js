import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: 
  { type: String,
     required: true },
  product_id: 
  { type: String, 
    required: true,
     unique: true },
  category: 
  { type: String, 
    required: true },
  gender: { type: String, required: true },
  price: { type: Number, required: true },
  background_image: { type: String, required: true },
  additional_images: { type: [String], required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  sizes: { type: [String], required: true },
  brand: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  collections: { type: String, required: true },
  material: { type: String, required: true },
  colors: { type: [String], required: true },
  discount: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
