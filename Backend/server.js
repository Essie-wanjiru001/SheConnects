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
const { pool, testConnection } = require('./config/database');

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
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://she-connects-ny8mvt8d2-esther-wanjirus-projects.vercel.app'
    : 'http://localhost:3000',
  credentials: true
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

// Add before routes
app.use(morgan('[:date[iso]] :method :url :status :response-time ms'));

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
app.get('/health', async (req, res) => {
  try {
    await testConnection();
    res.json({ 
      status: 'healthy',
      database: 'connected',
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'unhealthy',
      error: error.message 
    });
  }
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM users');
    res.json({
      status: 'success',
      dbConnected: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Database test failed:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
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

// Add after your routes
app.use((err, req, res, next) => {
  console.error('API Error:', {
    path: req.path,
    method: req.method,
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Single server initialization
const startServer = async () => {
  try {
    await testConnection();
    console.log('✅ Database connection verified');
    
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
    });

    // Graceful shutdown
    ['SIGINT', 'SIGTERM'].forEach(signal => {
      process.on(signal, async () => {
        console.log(`\n${signal} received. Shutting down gracefully...`);
        server.close(() => {
          console.log('🔌 HTTP server closed');
          process.exit(0);
        });
      });
    });

  } catch (error) {
    console.error('❌ Server initialization failed:', error);
    process.exit(1);
  }
};

// Start server
startServer();

