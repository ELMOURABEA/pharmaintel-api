const axios = require('axios');

async function fetchWHOArticles() {
  const url = 'https://ghoapi.azureedge.net/api/Articles';
  const response = await axios.get(url);
  return response.data;
}

module.exports = { fetchWHOArticles };
