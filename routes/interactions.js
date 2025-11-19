const express = require('express');
const router = express.Router();
const { checkInteractions } = require('../services/drugBankService');

router.post('/', async (req, res) => {
  try {
    const drugs = req.body?.drugs;
    if (!Array.isArray(drugs) || drugs.length === 0) {
      return res.status(400).json({ error: 'Invalid request: "drugs" must be a non-empty array.' });
    }
    const result = await checkInteractions(drugs);
    res.json(result);
  } catch (err) {
    console.error('Interaction check failed:', err);
    res.status(502).json({ error: 'Interaction check failed' });
  }
});

module.exports = router;
