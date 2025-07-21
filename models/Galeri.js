const mongoose = require('mongoose');

const galeriSchema = new mongoose.Schema({
  caption: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Galeri', galeriSchema);
