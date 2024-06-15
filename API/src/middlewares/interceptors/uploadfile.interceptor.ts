import multer from "multer";
import { BadRequestError } from "../../core/error.response";
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, callback) {
    // Allowed file types
    // const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (
      file.mimetype.startsWith("image") ||
      file.mimetype.startsWith("video")
    ) {
      callback(null, true);
    } else {
      throw new BadRequestError("Only video or image files are allowed.");
    }
  },
});

export default upload;
