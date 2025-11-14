const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Security & middleware
app.use(helmet());
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json({ limit: '1mb' }));

// Basic rate limit
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
const interactionRoutes = require('./routes/interactions');
const recallRoutes = require('./routes/recalls');
const whoRoutes = require('./routes/who');

app.use('/api/interactions', interactionRoutes);
app.use('/api/recalls', recallRoutes);
app.use('/api/who', whoRoutes);

// Health check with detailed status
app.get('/health', (req, res) => {
  const health = {
    status: 'ok',
    service: 'PharmaIntel',
    version: 'v1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    config: {
      drugBankConfigured: !!process.env.DRUGBANK_API_KEY,
    },
  };
  res.json(health);
});

// Root
app.get('/', (req, res) => {
  res.send(
    'PharmaIntel Bot API — Powered by COPILOT TO ACHIEVE — DR / MOSTAFA ABD-EL-KADER — IDEA @2025',
  );
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
});

// Graceful shutdown
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, closing server gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
