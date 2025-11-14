const express = require('express');
const router = express.Router();
const { getRecalls } = require('../services/openFdaService');

router.get('/', async (req, res) => {
  try {
    const ingredient = req.query?.ingredient;
    if (!ingredient) return res.status(400).json({ error: 'Missing "ingredient" query param.' });
    const result = await getRecalls(ingredient);
    res.json(result);
  } catch (err) {
    console.error('Recall fetch failed:', err.message);
    res.status(502).json({ error: 'Recall fetch failed' });
  }
});

module.exports = router;
