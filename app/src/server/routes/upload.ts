import * as express from 'express';
import { join, extname } from 'path';
import * as settings from '../settings';
import { v4 as uuidv4 } from 'uuid';
export const router = express.Router()

// File Uploading 
import * as multer from 'multer';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, settings.UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    const filename = uuidv4();
    cb(null, filename + '.md')
  }
});

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 10 * 1024,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const fileExtname = extname(file.originalname)
    if(fileExtname != '.md') {
      cb(new Error('upload file must be .md'));
      cb(null, false);
    } else{
      cb(null, true);
    }
  },
  rename: function (fieldname, filename) {
    console.log("Rename...");
    return filename + Date.now();
  },
});


router.get('/', (req, res) => res.sendFile(join(settings.DIST_DIR, 'assets/upload.html')))	

router.post('/', upload.single('file'), (req: any, res) => {
	const target = settings.HOST == 'localhost' ? 
		`http://${settings.HOST}:${settings.PORT}/assets/resumes/${req.file.filename}` :
    `https://${settings.HOST}/assets/resumes/${req.file.filename}` ;
	res.json({ target: target });
})


