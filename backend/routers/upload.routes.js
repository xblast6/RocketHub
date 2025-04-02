import express from "express";
import multer from "multer";
import cloudinary from "../cloudinary.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Funzione che crea uno stream per l'upload su Cloudinary
const streamUpload = (req) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    stream.end(req.file.buffer);
  });
};

// Ora l'endpoint è POST /upload (senza ripetizioni)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const result = await streamUpload(req);
    res.status(200).json({ url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
