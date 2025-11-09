const express = require('express');
const router = express.Router();
const { checkInteractions} = require('../services/drugBankService');

router.post('/', async (req, res) => {
  try {
    const result = await checkInteractions(req.body.drugs);
    res.json(result);
} catch (err) {
    res.status(500).json({ error: 'Interaction check failed'});
}
});

module.exports = router;
