import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from '../models/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const imagePath = path.join(__dirname, "..", "public", "images");

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(imagePath, "/"))
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage,
    fileFilter:(req, file, cb)=>{
        if (file.mimetype=='image/jpeg' || file.mimetype=='image/jpg' || file.mimetype==='image/png'){
            cb(null, true)
        }else{
            return cb(new Error('.png, .jpeg and .jpg files are allowed'))
        }
    },
    limits: {
        fileSize: 5*1024*1024
    }
})

export default upload;