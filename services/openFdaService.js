const axios = require('axios');

async function getRecalls(ingredient) {
  const url = `https://api.fda.gov/drug/enforcement.json?search=product_description:${ingredient}&limit=10`;
  const response = await axios.get(url);
  return response.data.results;
}

module.exports = { getRecalls};
