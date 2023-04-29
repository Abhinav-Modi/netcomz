const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
// import routes
const authRoutes = require("./routes/auth");
port = process.env.PORT || 8000;
url = process.env.DATABASE_URL;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Route Middleware
// app.use("/api", authRoutes);
fs.readdirSync("./routes").map((r) =>
	app.use("/api", require("./routes/" + r))
);

app.listen(port, console.log(`Server is running on port ${port}...`));
