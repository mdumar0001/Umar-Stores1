import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, this.filename.orginalname);
  },
});

const upload = multer({ storage });

export default upload;
