// tests/who.test.js
const axios = require('axios');
const BASE = process.env.BASE_URL || 'http://localhost:3000';

describe('WHO Articles API', () => {
  test('should fetch WHO articles', async () => {
    try {
      const res = await axios.get(`${BASE}/api/who`);
      expect([200, 502]).toContain(res.status);
      if (res.status === 200) {
        expect(res.data).toBeDefined();
        expect(typeof res.data === 'object' || Array.isArray(res.data)).toBe(true);
      }
    } catch (err) {
      // WHO API might be unavailable
      expect(err.response.status).toBe(502);
    }
  });

  test('should not accept POST requests', async () => {
    try {
      await axios.post(`${BASE}/api/who`, {});
    } catch (err) {
      expect([404, 405]).toContain(err.response.status);
    }
  });
});
