import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    product_id: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: ["Sneakers", "Boots", "Sandals", "Loafers", "Sports", "Formal"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids"],
    },
    price: { type: Number, required: true, min: 0 },

    background_image: { type: Buffer, required: true }, 
    additional_images: {
      type: [Buffer], 
      required: true,
      validate: {
        validator: (arr) => arr.length >= 3,
        message: "There should be at least three additional images",
      },
    },

    description: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    sizes: {
      type: [Number],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one size must be provided",
      },
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
