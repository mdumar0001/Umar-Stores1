import multer from "multer";

const storage = multer.diskStorage({
  //creating multer storage configuration
  //object
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage }); //upload middleware

export default upload;
