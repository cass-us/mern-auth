import express from "express";
import multer from "multer"; // Corrected import for multer
import { v2 as cloudinary } from "cloudinary"; // Corrected import for cloudinary
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config(); // Corrected dotenv import

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadSingleImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        let streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    { folder: "uploads" }, 
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                streamifier.createReadStream(buffer).pipe(stream);
            });
        };

        const result = await streamUpload(req.file.buffer);

        res.status(200).json({ success: true, imageUrl: result.secure_url });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ success: false, message: "Error uploading image", error: error.message });
    }
};
 //Route Example (if needed)
// const router = express.Router();
// router.post("/upload", upload.single("image"), uploadSingleImage); // Ensure "image" is the field name used in FormData

// export default router;
