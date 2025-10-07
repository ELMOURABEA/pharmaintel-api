const express = require('express');
const router = express.Router();
const { fetchWHOArticles} = require('../services/whoService');

router.get('/', async (req, res) => {
  try {
    const result = await fetchWHOArticles();
    res.json(result);
} catch (err) {
    res.status(500).json({ error: 'WHO articles fetch failed'});
}
});

module.exports = router;
