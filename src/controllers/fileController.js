const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const uploadFile = async (req, res) => {
  let { folderId } = req.body;
  
  if(folderId){
    folderId = parseInt(folderId);
  }

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

    res.render("fileDetails", { file });
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

const deleteFile = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.file.delete({
      where: { id: parseInt(id) },
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el archivo." });
  }
};

const editFileName = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    await prisma.file.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.redirect(`/files/${id}`);
  } catch (error) {
    res.status(500).json({ error: "Error al editar el nombre del archivo." });
  }
};

module.exports = {
  uploadFile,
  getFileDetails,
  downloadFile,
  deleteFile,
  editFileName,
};