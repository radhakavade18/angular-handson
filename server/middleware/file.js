const multer = require("multer");

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
}

// multer configuration to store images
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cd(error, "images")
    },
    filename: (req, file, cd) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cd(null, name + '_' + Date.now() + '.' + ext);
    }
})

module.exports = multer({ storage: storage }).single("image")