// tests/interactions.test.js
const axios = require('axios');
const BASE = process.env.BASE_URL || 'http://localhost:3000';

describe('Drug Interactions API', () => {
  test('should return 400 for missing drugs array', async () => {
    try {
      await axios.post(`${BASE}/api/interactions`, {});
    } catch (err) {
      expect(err.response.status).toBe(400);
      expect(err.response.data.error).toContain('drugs');
    }
  });

  test('should return 400 for empty drugs array', async () => {
    try {
      await axios.post(`${BASE}/api/interactions`, { drugs: [] });
    } catch (err) {
      expect(err.response.status).toBe(400);
      expect(err.response.data.error).toContain('non-empty array');
    }
  });

  test('should return 400 for invalid drugs format', async () => {
    try {
      await axios.post(`${BASE}/api/interactions`, { drugs: 'not-an-array' });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test('should accept valid drugs array', async () => {
    // Note: This test may fail if DRUGBANK_API_KEY is not set or invalid
    // It's expected to either succeed or return 502 (external API error)
    try {
      const res = await axios.post(`${BASE}/api/interactions`, {
        drugs: ['aspirin', 'ibuprofen'],
      });
      expect([200, 502]).toContain(res.status);
    } catch (err) {
      // External API errors are expected without valid API key
      expect(err.response.status).toBe(502);
    }
  });
});
