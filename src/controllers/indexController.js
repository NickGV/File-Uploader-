const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.index = async (req, res) => {
  const user = req.user || null;

  if (!user) {
    return res.render("index", { user, folders: [], files: [] });
  }

  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: user.id,
      },
    });

    const files = await prisma.file.findMany({
      where: {
        userId: user.id,
      },
    });

    res.render("index", { user, folders, files });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};
