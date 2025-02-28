require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const upload = multer();
const db = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require('./routes/adminRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/users', userRoutes);

// Basic Route
app.get("/", (req, res) => {
  res.send("🚀 Express Server is Running & Connected to Database!");
});

// Start Server
app.listen(PORT, async () => {
  try {
    // Test database connection using the pool
    const connection = await db.getConnection();
    connection.release();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log('✅ Successfully connected to MySQL Database');
    console.log('🚀 Database connected');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

