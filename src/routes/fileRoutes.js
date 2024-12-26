const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

const {
  uploadFile,
  getFileDetails,
  downloadFile,
} = require("../controllers/fileController");

router.post("/upload", ensureAuthenticated, upload.single("file"), uploadFile);

router.get("/:id", getFileDetails);

router.get("/download/:id", downloadFile);

module.exports = router;
