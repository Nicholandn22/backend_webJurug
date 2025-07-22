require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const agendaRoutes = require("./routes/agendaRoutes");

const app = express();

// Middleware
app.use(
	cors({
		origin: ["https://frontend-web-jurug.vercel.app"], // Ganti dengan domain Vercel kamu
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type"],
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/agenda", agendaRoutes);

app.get("/", (req, res) => res.send("Backend is running!"));

// Env Variables
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

// MongoDB Connection
async function connectDB() {
	try {
		const client = new MongoClient(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000, // agar tidak hang lama
		});

		await client.connect();
		console.log("✅ Connected to MongoDB");

		// Simpan DB instance
		app.locals.db = client.db("dbdesa"); // Pastikan db name benar

		// Start Server setelah DB siap
		app.listen(PORT, () => {
			console.log(`🚀 Server running on port ${PORT}`);
		});
	} catch (err) {
		console.error("❌ MongoDB Connection Error:", err.message);
		process.exit(1);
	}
}

// Run
connectDB();
