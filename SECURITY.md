# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within PharmaIntel API, please send an email to the maintainer. All security vulnerabilities will be promptly addressed.

**Please do not publicly disclose the vulnerability until it has been addressed.**

### What to Include

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution**: Varies based on severity and complexity

## Security Best Practices for Users

1. **API Keys**: Never commit API keys to version control. Use environment variables.
2. **HTTPS**: Always use HTTPS in production to encrypt data in transit.
3. **Rate Limiting**: The API includes rate limiting (60 req/min). Configure appropriately for your use case.
4. **Input Validation**: Always validate and sanitize user inputs before passing to the API.
5. **Updates**: Keep dependencies updated. Run `npm audit` regularly.
6. **CORS**: Review and restrict CORS settings based on your deployment needs.

## Known Security Considerations

### Current Security Measures

- ✅ Helmet.js for secure HTTP headers
- ✅ CORS protection
- ✅ Rate limiting (60 requests per minute per IP)
- ✅ Request body size limits (1MB)
- ✅ Input validation on all endpoints

### Planned Improvements

- [ ] API authentication and authorization
- [ ] Request signing for API calls
- [ ] Audit logging for all API operations
- [ ] DDoS protection enhancements
- [ ] Content Security Policy headers

## Security Updates

Subscribe to repository releases to be notified of security updates.
