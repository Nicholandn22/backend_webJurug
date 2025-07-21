const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllGaleri, uploadGaleri } = require('../controllers/galeriController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.get('/', getAllGaleri);
router.post('/', upload.single('image'), uploadGaleri);

module.exports = router;
