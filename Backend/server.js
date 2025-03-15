const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { pool, testConnection } = require('./config/database');
const cron = require('node-cron');

// Remove the describe block that was causing the issue
// Import routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require('./routes/adminRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Security Middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  'https://sheconnects-teal.vercel.app',
  'https://sheconnects-esther-wanjirus-projects.vercel.app',
  'https://sheconnects-essie-wanjiru001-esther-wanjirus-projects.vercel.app',
  'https://sheconnects-api.onrender.com',
  'http://localhost:3000' 
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin 
    if (!origin) {
      return callback(null, true);
    }

    // Remove trailing slashes and compare
    const cleanOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(cleanOrigin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization',
    'X-Requested-With',
    'Accept'
  ],
  optionsSuccessStatus: 200
};

// Apply CORS middleware before routes
app.use(cors(corsOptions));

// Add CORS preflight for all routes
app.options('*', cors(corsOptions));

// General Middleware
app.use(morgan('dev')); // Request logging
app.use(compression()); // Response compression
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
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
app.use('/api/events', eventRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/search', searchRoutes);

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
  console.error('API Error:', {
    path: req.path,
    method: req.method,
    origin: req.headers.origin,
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString()
  });
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS error',
      message: 'Origin not allowed'
    });
  }
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message
  });
});

// Export the app before starting the server
module.exports = app;

// Only start the server if this file is run directly
if (require.main === module) {
  const startServer = async () => {
    try {
      await testConnection();
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };
  
  startServer();
}

