const Galeri = require('../models/Galeri');

exports.getAllGaleri = async (req, res) => {
  const data = await Galeri.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.uploadGaleri = async (req, res) => {
  const { caption } = req.body;
  const imageUrl = req.file.path;
  const galeri = new Galeri({ caption, imageUrl });
  await galeri.save();
  res.json(galeri);
};
