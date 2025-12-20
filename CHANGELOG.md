# Changelog

All notable changes to PharmaIntel API will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-14

### Added

- Initial release of PharmaIntel API
- Drug interaction checking via DrugBank API
- FDA drug recalls query via OpenFDA API
- WHO Global Health Observatory articles endpoint
- Health check endpoint
- Security features:
  - Helmet.js for secure HTTP headers
  - CORS protection
  - Rate limiting (60 req/min per IP)
  - Input validation
  - Request body size limits
- Docker support with Dockerfile and docker-compose
- CI/CD pipeline for Google Cloud Run deployment
- Basic test suite with health endpoint test
- Comprehensive documentation (README, SECURITY, CONTRIBUTING)
- MIT License

### Security

- Request rate limiting to prevent abuse
- Secure HTTP headers via Helmet
- Input validation on all endpoints
- Environment variable configuration for sensitive data

## [Unreleased]

### Planned

- API authentication and authorization
- Comprehensive test coverage for all endpoints
- OpenAPI/Swagger documentation
- Enhanced error logging and monitoring
- Performance metrics and monitoring
- Additional pharmaceutical data sources
