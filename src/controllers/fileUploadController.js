const upload = require("../services/fileUpload");
const singleUpload = upload.single("image");
const multiUpload = upload.array("images", 5);

const avatarUpload = (req, res) => {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }],
      });
    }
    return res.json({ imageUrl: req.file.location });
  });
};

const listingImgUpload = (req, res) => {
  multiUpload(req, res, (error) => {
    if (error) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: error.message }],
      });
    } else {
      // If File not found
      if (req.files === undefined) {
        console.log("uploadProductsImages Error: No File Selected!");
        res.status(500).json({
          status: "fail",
          message: "Error: No File Selected",
        });
      } else {
        // If Success
        let fileArray = req.files,
          fileLocation;
        const images = [];
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].location;
          console.log("filename", fileLocation);
          images.push(fileLocation);
        }
        // Save the file name into database
        return res.status(200).json({
          status: "ok",
          filesArray: fileArray,
          locationArray: images,
        });
      }
    }
  });
};

module.exports = { avatarUpload, listingImgUpload };
