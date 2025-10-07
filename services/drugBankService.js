const axios = require('axios');

async function checkInteractions(drugs) {
  const response = await axios.post('https://api.drugbank.com/v1/interactions', {
    drugs: drugs
}, {
    headers: { Authorization: `Bearer ${process.env.DRUGBANK_API_KEY}`}
});
  return response.data;
}

module.exports = { checkInteractions};
