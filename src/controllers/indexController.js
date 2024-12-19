exports.index = (req, res) => {
  const user = req.user || null;
  const folder = []
  const files = []
  res.render("index", { user, folder, files });
};
