const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());

// Routes
const interactionRoutes = require('./routes/interactions');
const recallRoutes = require('./routes/recalls');
const whoRoutes = require('./routes/who');

app.use('/api/interactions', interactionRoutes);
app.use('/api/recalls', recallRoutes);
app.use('/api/who', whoRoutes);

app.get('/', (req, res) => {
  res.send('PharmaIntel Bot API — Powered by COPILOT TO ACHIEVE — DR / MOSTAFA ABD-EL-KADER — IDEA @2025');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
