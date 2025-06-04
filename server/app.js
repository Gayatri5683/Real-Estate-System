import express from "express";
import cors from "cors";
import multer from "multer";
import userRoutes from "./routes/userRoutes.js";
import propertiesRoutes from "./routes/properties.js";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';
import sellerRoutes from "./routes/sellerRoutes.js";


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Files will be saved in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        // Generate a unique filename: fieldname-timestamp.ext
        // You might want a more robust unique ID for production (e.g., uuid)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/properties', upload.array("images"), propertiesRoutes);
app.use('/api/v1/sellers', sellerRoutes);

app.get('/', (req, res) => {
    res.json({message : 'welcome to code shift api'});
})

export default app;