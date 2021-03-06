// import package here
const multer = require("multer");

exports.uploadFile = (imageFile) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      let filename =
        file.originalname.split(".")[file.originalname.split(".").length - 1];
      cb(
        null,
        Date.now() + Math.random().toString(36).split(".")[1] + "." + filename
      );
    },
  });

  const fileFilter = function (req, file, cb) {
    if (file.filename === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!",
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    }
    cb(null, true);
  };

  const sizeInMb = 10;
  const maxSize = sizeInMb * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(imageFile);

  return (req, res, next) => {
    upload(req, res, function (err) {
      // condition if no match
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }
      // condition if not image uploaded
      // if (!req.file && !err) {
      //   return res.status(400).send({
      //     message: "Please select files to upload",
      //   });
      // }

      if (err) {
        // condition if file > file size
        if (err.code == "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: `Max file sized ${sizeInMb}Mb`,
          });
        }
        return res.status(400).send(err);
      }
      return next();
    });
  };
};
