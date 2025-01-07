const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/authMiddleware");
const {
  createFolder,
  getFolders,
  getFolder,
  updateFolder,
  deleteFolder,
} = require("../controllers/folderController");

router.post("/create", ensureAuthenticated, createFolder);
router.get("/", ensureAuthenticated, getFolders);
router.get("/:id", ensureAuthenticated, getFolder);
router.put("/edit/:id", ensureAuthenticated, updateFolder);
router.delete("/delete/:id", ensureAuthenticated, deleteFolder);

module.exports = router;