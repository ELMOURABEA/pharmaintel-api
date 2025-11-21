const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();

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

// Health
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'PharmaIntel', version: 'v1' }));

// Root
app.get('/', (req, res) => {
  res.send('PharmaIntel Bot API — Powered by COPILOT TO ACHIEVE — DR / MOSTAFA ABD-EL-KADER — IDEA @2025');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
