// tests/health.test.js
const axios = require('axios');
const BASE = process.env.BASE_URL || 'http://localhost:3000';

test('health endpoint returns ok', async () => {
  const res = await axios.get(`${BASE}/health`);
  expect(res.status).toBe(200);
  expect(res.data.status).toBe('ok');
});
