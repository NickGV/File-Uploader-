const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createFolder = async (req, res) => {
  const { name } = req.body;

  try {
    const folder = await prisma.folder.create({
      data: {
        name,
        userId: req.user.id,
      },
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la carpeta." });
  }
};

const getFolders = async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.json(folders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las carpetas." });
  }
};

const getFolder = async (req, res) => {
  const { id } = req.params;

  try {
    const folder = await prisma.folder.findUnique({
      where: { id: parseInt(id) },
      include: {
        files: true,
      },
    });

    if (!folder) {
      return res.status(404).json({ error: "Carpeta no encontrada." });
    }

    res.render("folderDetails", { folder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener la carpeta." });
  }
};

const updateFolder = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const folder = await prisma.folder.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(folder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar la carpeta." });
  }
};

const deleteFolder = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.folder.delete({
      where: { id: parseInt(id) },
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al eliminar la carpeta." });
  }
};

module.exports = {
  createFolder,
  getFolders,
  getFolder,
  updateFolder,
  deleteFolder,
};