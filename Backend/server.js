require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const upload = multer();
const db = require("./config/database");
const cron = require('node-cron');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const { promisePool, testConnection } = require('./config/database');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'essie',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'sheconnects',
  port: process.env.DB_PORT || 3306
};

// Route imports
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require('./routes/adminRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const userRoutes = require('./routes/userRoutes');
const ScholarshipScraper = require('./services/scholarshipScraper');

const app = express();
const PORT = process.env.PORT || 8000;

// Security Middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: [
    'https://frontend-git-main-esther-wanjirus-projects.vercel.app',
    'https://frontend-9wda2ezcv-esther-wanjirus-projects.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// General Middleware
app.use(morgan('dev')); // Request logging
app.use(compression()); // Response compression
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use("/api/auth", authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/users', userRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    status: "🚀 Server is running",
    dbConnection: "Connected",
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Schedule Scholarship Scraping
if (process.env.NODE_ENV === 'production') {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled scholarship scraping...');
    try {
      await ScholarshipScraper.scrapeScholarships();
      console.log('Scholarship scraping completed successfully');
    } catch (error) {
      console.error('Scholarship scraping failed:', error);
    }
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString()
  });

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start Server with database check
async function startServer() {
  try {
    await testConnection();
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();

// Handle server errors
app.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
  process.exit(1);
});

