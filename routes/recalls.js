const express = require('express');
const router = express.Router();
const { getRecalls} = require('../services/openFdaService');

router.get('/', async (req, res) => {
  try {
    const result = await getRecalls(req.query.ingredient);
    res.json(result);
} catch (err) {
    res.status(500).json({ error: 'Recall fetch failed'});
}
});

module.exports = router;
