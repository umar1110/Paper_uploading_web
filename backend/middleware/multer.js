import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../'),
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage: storage });
