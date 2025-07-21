const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
  judul: String,
  deskripsi: String,
  gambar: String, // path gambar lokal atau URL
});

module.exports = mongoose.model('Agenda', agendaSchema);
