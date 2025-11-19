// tests/recalls.test.js
const axios = require('axios');
const BASE = process.env.BASE_URL || 'http://localhost:3000';

describe('FDA Recalls API', () => {
  test('should return 400 for missing ingredient parameter', async () => {
    try {
      await axios.get(`${BASE}/api/recalls`);
    } catch (err) {
      expect(err.response.status).toBe(400);
      expect(err.response.data.error).toContain('ingredient');
    }
  });

  test('should accept valid ingredient parameter', async () => {
    try {
      const res = await axios.get(`${BASE}/api/recalls?ingredient=aspirin`);
      expect([200, 502]).toContain(res.status);
      if (res.status === 200) {
        expect(Array.isArray(res.data) || typeof res.data === 'object').toBe(true);
      }
    } catch (err) {
      // OpenFDA API might be unavailable or rate limited
      expect([502, 429]).toContain(err.response.status);
    }
  });

  test('should handle URL-encoded ingredient names', async () => {
    try {
      const res = await axios.get(`${BASE}/api/recalls?ingredient=acetaminophen%20500mg`);
      expect([200, 502]).toContain(res.status);
    } catch (err) {
      expect([502, 429]).toContain(err.response.status);
    }
  });
});
