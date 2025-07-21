// require("dotenv").config();
// const express = require("express"); // ⬅️ pindahkan ke atas
// const cors = require("cors"); // ⬅️ tambahkan ini

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const agendaRoutes = require("./routes/agendaRoutes");

// const app = express();
// app.use(cors()); // ⬅️ aktifkan CORS
// const PORT = process.env.PORT || 5000;

// const uri = process.env.MONGO_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true });


// // Middleware
// app.use("/uploads", express.static("uploads"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/agenda", agendaRoutes);
// // Jalankan server setelah connect
// async function run() {
// 	try {
// 		await client.connect();
// 		await client.db("admin").command({ ping: 1 });
// 		console.log("✅ Connected to MongoDB");

// 		app.locals.db = client.db("dbdesa"); // ⬅️ ganti sesuai nama database kamu
// 		app.listen(PORT, () => {
// 			console.log(`🚀 Server running on http://localhost:${PORT}`);
// 		});
// 	} catch (err) {
// 		console.error("❌ Mongo Error:", err);
// 	}
// }

// run().catch(console.dir);


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const agendaRoutes = require("./routes/agendaRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use("/api/agenda", agendaRoutes);

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    app.locals.db = client.db("dbdesa"); // Pastikan sesuai dengan nama database

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Mongo Error:", err);
  }
}

run();
