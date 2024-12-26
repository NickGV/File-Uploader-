const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const uploadFile = async (req, res) => {
  const { folderId } = req.body;

  try {
    const file = await prisma.file.create({
      data: {
        name: req.file.originalname,
        url: path.join("/uploads", req.file.filename),
        size: req.file.size,
        folderId: folderId || null,
        userId: req.user.id,
      },
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al subir el archivo." });
  }
};

const getFileDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const file = await prisma.file.findUnique({
      where: { id: parseInt(id) },
    });

    if (!file) {
      return res.status(404).json({ error: "Archivo no encontrado." });
    }

    res.json(file);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los detalles del archivo." });
  }
};

const downloadFile = async (req, res) => {
  const { id } = req.params;

  try {
    const file = await prisma.file.findUnique({
      where: { id: parseInt(id) },
    });

    if (!file) {
      return res.status(404).json({ error: "Archivo no encontrado." });
    }

    res.download(path.join(__dirname, "..", file.url), file.name);
  } catch (error) {
    res.status(500).json({ error: "Error al descargar el archivo." });
  }
};

module.exports = {
  uploadFile,
  getFileDetails,
  downloadFile,
};
