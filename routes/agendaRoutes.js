const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Setup multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		const uniqueName = Date.now() + path.extname(file.originalname);
		cb(null, uniqueName);
	},
});
const upload = multer({ storage: storage });

// GET semua agenda
router.get("/", async (req, res) => {
	try {
		const db = req.app.locals.db;
		const agenda = await db
			.collection("agenda")
			.find()
			.sort({ tanggalUpload: -1 }) // ⬅️ sort by terbaru
			.toArray(); // ⬅️ ubah cursor jadi array

		res.json(agenda);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// POST agenda baru
router.post("/", upload.single("gambar"), async (req, res) => {
	try {
		console.log("📥 Request masuk:", req.body);
		console.log("🖼️ File:", req.file);

		if (!req.file) {
			return res.status(400).json({ message: "Gambar tidak ditemukan!" });
		}

		const { judul, deskripsi } = req.body;
		const gambarPath = "uploads/" + req.file.filename;

		const db = req.app.locals.db;
		await db.collection("agenda").insertOne({
			judul,
			deskripsi,
			gambar: gambarPath,
			tanggalUpload: new Date(),
		});

		res.status(201).json({ message: "Agenda berhasil disimpan" });
	} catch (err) {
		console.error("❌ Gagal menyimpan agenda:", err);
		res.status(500).json({ message: "Gagal menyimpan agenda" });
	}
});

module.exports = router;


