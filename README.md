# PharmaIntel API

**Intelligent Pharmacist API**  
*Let's make it happen, Dr. Mostafa Abd-el-Kader 💼💊*

## Overview

PharmaIntel API is a production-ready RESTful service providing pharmaceutical intelligence including drug interactions, FDA recalls, and WHO health articles. Built with security best practices and ready for deployment to Google Cloud Run.

## Features

- 🔒 **Security-First**: Helmet, CORS, rate limiting
- 💊 **Drug Interactions**: Check interactions using DrugBank API
- 🚨 **FDA Recalls**: Query drug recalls from OpenFDA
- 🌍 **WHO Articles**: Fetch WHO Global Health Observatory articles
- ✅ **Health Monitoring**: Built-in health check endpoint
- 🐳 **Docker Ready**: Containerized for easy deployment
- ☁️ **Cloud Native**: CI/CD pipeline for Google Cloud Run

## Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your DRUGBANK_API_KEY
   ```

3. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

The API will be available at `http://localhost:3000`

### Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build and run manually
docker build -t pharmaintel-api .
docker run -p 3000:3000 -e DRUGBANK_API_KEY=your_key pharmaintel-api
```

## API Endpoints

### Health Check
```http
GET /health
```
Returns service status and version information.

### Drug Interactions
```http
POST /api/interactions
Content-Type: application/json

{
  "drugs": ["drugA", "drugB"]
}
```
Checks drug interactions using DrugBank API.

### FDA Recalls
```http
GET /api/recalls?ingredient=ibuprofen
```
Retrieves FDA drug recall information.

### WHO Articles
```http
GET /api/who
```
Fetches WHO Global Health Observatory articles.

## Deployment

### Google Cloud Run

This repository includes automated deployment to Google Cloud Run via GitHub Actions.

#### Prerequisites

1. Create a Google Cloud project
2. Enable Cloud Run, Artifact Registry, Secret Manager
3. Create an Artifact Registry repository named "pharmaintel"
4. Add DRUGBANK_API_KEY to Secret Manager
5. Create a service account with permissions:
   - Cloud Run Admin
   - Artifact Registry Writer
   - Secret Manager Secret Accessor

#### GitHub Secrets

Configure these secrets in your GitHub repository:
- `GCP_PROJECT_ID`: Your GCP project ID (e.g., `pharmaintel`)
- `GCP_REGION`: Deployment region (e.g., `europe-west1`)
- `GCP_SA_EMAIL`: Service account email
- `GCP_SA_KEY`: Service account JSON key

#### Deploy

Push a version tag to trigger deployment:
```bash
git tag v1.0.0
git push origin v1.0.0
```

Or manually trigger via GitHub Actions.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 3000) |
| `DRUGBANK_API_KEY` | Yes | DrugBank API authentication key |

## Testing

```bash
# Run tests
npm test

# Test health endpoint
BASE_URL=http://localhost:3000 npm test
```

## Security

- **Helmet**: Sets secure HTTP headers
- **CORS**: Configured for public access (adjust as needed)
- **Rate Limiting**: 60 requests per minute per IP
- **Input Validation**: All endpoints validate inputs
- **Error Handling**: No sensitive data in error responses

⚠️ **Note**: CORS is set to `origin: '*'` for public API access. Restrict this in production if needed.

## Project Structure

```
pharmaintel-api/
├── app.js                    # Main application
├── routes/
│   ├── interactions.js       # Drug interactions endpoint
│   ├── recalls.js           # FDA recalls endpoint
│   └── who.js               # WHO articles endpoint
├── services/
│   ├── drugBankService.js   # DrugBank API integration
│   ├── openFdaService.js    # OpenFDA API integration
│   └── whoService.js        # WHO API integration
├── tests/
│   └── health.test.js       # Health endpoint tests
├── .github/workflows/
│   └── deploy-cloudrun.yml  # CI/CD pipeline
├── Dockerfile               # Container definition
├── docker-compose.yml       # Local development
└── .env.example            # Environment template
```

## License & Credits

**Copyright 2025 @ DR. Mostafa ELMOURABEA**  
*(Full thanks to ALLAH)*

Powered by COPILOT TO ACHIEVE — DR / MOSTAFA ABD-EL-KADER — IDEA @2025

<a href="https://pharmaintel-bot--elmourabea.github.app/">Pharmacy AI-BOT</a> by <a href="https://mostelmorabeacom.link">Mostafa Elmourabea</a> is marked <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0</a>
