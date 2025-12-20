# GitHub Copilot Repository Instructions

## Project Overview

PharmaIntel API is a production-ready RESTful service providing pharmaceutical intelligence including drug interactions, FDA recalls, and WHO health articles. Built with Node.js and Express, emphasizing security, reliability, and clean code practices.

## Code Style & Formatting

### Language & Version

- Use Node.js 18+ features
- CommonJS module system (`require`/`module.exports`)
- Use ES6+ JavaScript features (const, let, arrow functions, async/await, destructuring)

### Formatting Standards

- Use Prettier with the project's `.prettierrc.json` configuration:
  - Single quotes for strings
  - Semicolons required
  - 2 spaces indentation
  - 100 character line width
  - Trailing commas in ES5-compatible locations
- Run `npm run format` to auto-format code
- Run `npm run format:check` before committing

### Linting

- Follow ESLint configuration in `eslint.config.js`
- `no-console` is allowed (server logging is important)
- Unused variables prefixed with `_` are allowed (e.g., `_next` in middleware)
- Run `npm run lint` to check, `npm run lint:fix` to auto-fix

### Naming Conventions

- Use `camelCase` for variables, functions, and file names
- Use `PascalCase` for class names (if needed)
- Use `UPPER_SNAKE_CASE` for constants and environment variables
- Use descriptive, meaningful names (e.g., `checkInteractions` not `check`)

## Project Structure

```
pharmaintel-api/
├── app.js                    # Main application entry point with middleware setup
├── routes/                   # API route handlers (thin layer, delegate to services)
│   ├── interactions.js       # Drug interactions endpoint
│   ├── recalls.js           # FDA recalls endpoint
│   └── who.js               # WHO articles endpoint
├── services/                 # Business logic and external API integrations
│   ├── drugBankService.js   # DrugBank API integration
│   ├── openFdaService.js    # OpenFDA API integration
│   └── whoService.js        # WHO API integration
└── tests/                    # Test files (Jest)
    └── *.test.js            # Tests matching the file they test
```

### Architecture Patterns

- **Separation of concerns**: Routes handle HTTP, services handle business logic
- **Route handlers**: Keep thin, validate input, call services, handle responses
- **Service modules**: Encapsulate external API calls and business logic
- **Error handling**: Use try-catch in routes, propagate errors with meaningful messages

## Library Preferences

### Required Dependencies

- **express**: Web framework (v5.1.0+)
- **axios**: HTTP client for external API calls
- **dotenv**: Environment variable management
- **helmet**: Security headers
- **cors**: CORS middleware
- **express-rate-limit**: Rate limiting

### Development Dependencies

- **jest**: Testing framework
- **eslint**: Code linting
- **prettier**: Code formatting
- **nodemon**: Development server with auto-reload

### Library Guidelines

- Prefer `axios` over `fetch` or `request` for HTTP calls
- Use `helmet` for all security headers
- Use `express-rate-limit` for rate limiting
- Avoid adding new dependencies without justification

## Security Best Practices

### Critical Security Rules

1. **Never commit secrets**: Use environment variables for API keys and sensitive data
2. **API Keys**: Store in `.env` file (never commit), access via `process.env`
3. **Input Validation**: Always validate and sanitize user inputs before processing
4. **Error Messages**: Never expose sensitive information or stack traces in production
5. **Rate Limiting**: Maintain the 60 requests/minute default or adjust based on needs
6. **CORS**: Review CORS settings (`origin: '*'` is for public APIs; restrict if needed)
7. **Request Body Limits**: Keep the 1MB limit to prevent payload attacks

### Security Middleware Order

1. Request logging
2. Helmet (security headers)
3. CORS
4. Body parser with size limits
5. Rate limiter

### Example Secure Service

```javascript
const axios = require('axios');

async function fetchData() {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) throw new Error('Missing API_KEY');

  const response = await axios.get('https://api.example.com/data', {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return response.data;
}
```

## API Endpoint Patterns

### Route Handler Structure

```javascript
const express = require('express');
const router = express.Router();
const { serviceFunction } = require('../services/someService');

router.post('/', async (req, res) => {
  try {
    // 1. Validate input
    const input = req.body?.field;
    if (!input || typeof input !== 'string') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // 2. Call service
    const result = await serviceFunction(input);

    // 3. Return response
    res.json(result);
  } catch (err) {
    // 4. Handle errors
    console.error('Operation failed:', err);
    res.status(502).json({ error: 'Operation failed' });
  }
});

module.exports = router;
```

### HTTP Status Codes

- `200`: Successful GET/POST
- `400`: Invalid client input
- `404`: Resource not found
- `500`: Internal server error
- `502`: External service failure (upstream API errors)

### Response Format

- Success: Return JSON data directly or `{ data: ... }`
- Error: Always use `{ error: "Message" }` format
- Health checks: Include `status`, `service`, `version`, `timestamp`

## Testing Guidelines

### Test Framework

- Use Jest for all tests
- Test files: `tests/*.test.js` matching the module/route name
- Run tests: `npm test`
- Watch mode: `npm run test:watch`
- Coverage: `npm run test:coverage`

### Test Structure

```javascript
const axios = require('axios');
const BASE = process.env.BASE_URL || 'http://localhost:3000';

test('descriptive test name', async () => {
  const res = await axios.get(`${BASE}/endpoint`);
  expect(res.status).toBe(200);
  expect(res.data).toHaveProperty('expectedField');
});
```

### Testing Best Practices

- Write tests for new features and endpoints
- Test both success and error cases
- Use descriptive test names
- Mock external API calls when appropriate
- Ensure all tests pass before submitting PR
- Don't remove existing tests without good reason

## Error Handling

### Standard Error Pattern

```javascript
try {
  // Operation
  const result = await someOperation();
  res.json(result);
} catch (err) {
  console.error('Operation failed:', err);
  res.status(502).json({ error: 'Operation failed' });
}
```

### Error Logging

- Always log errors with `console.error` including context
- Log format: `console.error('Context:', err)`
- Include operation name in error messages

### Global Error Handler

- Already configured in `app.js`
- Prevents sensitive data leaks in production
- Returns generic "Internal server error" in production mode

## Documentation Requirements

### Code Comments

- Add comments for complex logic or non-obvious code
- Keep comments concise and up-to-date
- Avoid redundant comments (e.g., `// get user` above `getUser()`)

### API Documentation

- Update `README.md` when adding new endpoints
- Include request/response examples
- Document required environment variables in README

### Commit Messages

Follow conventional commit format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Test additions or updates
- `refactor:` Code refactoring
- `chore:` Maintenance tasks
- `security:` Security improvements

Example: `feat: Add authentication middleware`

## Asynchronous Operations

### Always Use async/await

- Prefer `async/await` over callbacks or raw promises
- Always handle errors with try-catch blocks
- Don't mix callback and promise patterns

### Example

```javascript
// Good
async function fetchData() {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error('Fetch failed:', err);
    throw err;
  }
}

// Avoid
function fetchData(callback) {
  axios
    .get(url)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((err) => {
      callback(err);
    });
}
```

## Environment Variables

### Required Variables

- `DRUGBANK_API_KEY`: DrugBank API authentication (required)
- `PORT`: Server port (optional, default: 3000)
- `NODE_ENV`: Environment mode (development/production)

### Usage Pattern

```javascript
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error('Missing required environment variable: API_KEY');
}
```

### Never Commit

- `.env` files are in `.gitignore`
- Use `.env.example` as a template
- Document all required variables in README

## Middleware Guidelines

### Request Logging

- Already configured in `app.js`
- Logs: method, path, status code, duration
- Format: `GET /api/endpoint 200 - 45ms`

### Custom Middleware

- Place in `app.js` or separate `middleware/` directory if complex
- Follow Express middleware signature: `(req, res, next) => {}`
- Always call `next()` or send a response

## Docker & Deployment

### Docker

- `Dockerfile` is configured for production
- Use `docker-compose.yml` for local development
- Never commit secrets to Docker files

### Cloud Run Deployment

- CI/CD configured in `.github/workflows/deploy-cloudrun.yml`
- Triggered by version tags (e.g., `v1.0.0`)
- Secrets managed via GCP Secret Manager

## Dependencies & Updates

### Security

- Run `npm audit` regularly
- Address vulnerabilities promptly
- Keep dependencies updated

### Adding Dependencies

- Justify new dependencies in PRs
- Prefer well-maintained, popular packages
- Check for security advisories before adding

## Key Principles

1. **Security First**: Never compromise on security best practices
2. **Simplicity**: Keep code simple and readable
3. **DRY**: Don't repeat yourself
4. **YAGNI**: You aren't gonna need it (avoid over-engineering)
5. **Test**: Write tests for new functionality
6. **Document**: Update docs when changing behavior
7. **Graceful Degradation**: Handle errors gracefully, fail safely

## Example: Adding a New Endpoint

1. **Create Service** (`services/newService.js`):

```javascript
const axios = require('axios');

async function fetchNewData(param) {
  const API_KEY = process.env.NEW_API_KEY;
  if (!API_KEY) throw new Error('Missing NEW_API_KEY');

  const response = await axios.get(`https://api.example.com/${param}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return response.data;
}

module.exports = { fetchNewData };
```

2. **Create Route** (`routes/new.js`):

```javascript
const express = require('express');
const router = express.Router();
const { fetchNewData } = require('../services/newService');

router.get('/', async (req, res) => {
  try {
    const param = req.query?.param;
    if (!param) {
      return res.status(400).json({ error: 'Missing required parameter: param' });
    }
    const result = await fetchNewData(param);
    res.json(result);
  } catch (err) {
    console.error('Fetch failed:', err);
    res.status(502).json({ error: 'External API request failed' });
  }
});

module.exports = router;
```

3. **Register in app.js**:

```javascript
const newRoutes = require('./routes/new');
app.use('/api/new', newRoutes);
```

4. **Add Test** (`tests/new.test.js`):

```javascript
const axios = require('axios');
const BASE = process.env.BASE_URL || 'http://localhost:3000';

test('new endpoint returns data', async () => {
  const res = await axios.get(`${BASE}/api/new?param=value`);
  expect(res.status).toBe(200);
  expect(res.data).toBeDefined();
});
```

5. **Update README.md** with endpoint documentation
6. **Add environment variable** to `.env.example` if needed

---

**Remember**: This is a production API handling pharmaceutical data. Prioritize security, reliability, and code quality in all contributions.
