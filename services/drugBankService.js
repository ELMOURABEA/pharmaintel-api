const axios = require('axios');

async function checkInteractions(drugs) {
  const DRUGBANK_KEY = process.env.DRUGBANK_API_KEY;
  if (!DRUGBANK_KEY) throw new Error('Missing DRUGBANK_API_KEY');
  const response = await axios.post(
    'https://api.drugbank.com/v1/interactions',
    { drugs },
    { headers: { Authorization: `Bearer ${DRUGBANK_KEY}` } }
  );
  return response.data;
}

module.exports = { checkInteractions };
