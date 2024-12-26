const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

const {
  uploadFile,
  getFileDetails,
  downloadFile,
  deleteFile,
  editFileName,
} = require("../controllers/fileController");

router.post("/upload", ensureAuthenticated, upload.single("file"), uploadFile);

router.get("/:id", getFileDetails);

router.get("/download/:id", downloadFile);

router.post("/delete/:id", ensureAuthenticated, deleteFile);

router.post("/edit/:id", ensureAuthenticated, editFileName);

module.exports = router;