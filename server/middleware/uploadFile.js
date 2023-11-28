const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');

const slug = slugify(uuidv4());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        console.log("🚀  file: uploadFile.js:12  file:", file)
        
        const fileExtension = file.originalname.split('.').pop();
      
        const uniqueFilename = `img-${uuidv4()}.${fileExtension}`;
        cb(null, uniqueFilename);
    }
});

exports.upload = multer({ storage: storage }).single('file');