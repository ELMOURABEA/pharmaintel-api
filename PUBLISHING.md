# Publishing Guide for PharmaIntel API

This guide covers the complete process for publishing the PharmaIntel API to various package registries and marketplaces.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Publishing to GitHub Packages](#publishing-to-github-packages)
- [Publishing to NPM Registry](#publishing-to-npm-registry)
- [Creating GitHub Releases](#creating-github-releases)
- [Docker Image Publishing](#docker-image-publishing)
- [API Marketplace Listings](#api-marketplace-listings)
- [Pre-Publication Checklist](#pre-publication-checklist)

## Prerequisites

Before publishing, ensure you have:

- [x] All tests passing (`npm test`)
- [x] Code linted and formatted (`npm run lint`, `npm run format:check`)
- [x] Documentation up to date
- [x] CHANGELOG.md updated with version changes
- [x] Security audit passed (`npm audit --production`)
- [x] Git repository clean (no uncommitted changes)
- [x] Version number updated in package.json

## Publishing to GitHub Packages

The PharmaIntel API is configured to automatically publish to GitHub Packages when a GitHub release is created.

### Automatic Publishing (Recommended)

1. **Ensure package.json is configured correctly:**

   ```json
   {
     "name": "pharmaintel-api",
     "version": "1.0.0",
     "repository": {
       "type": "git",
       "url": "https://github.com/ELMOURABEA/pharmaintel-api.git"
     },
     "publishConfig": {
       "registry": "https://npm.pkg.github.com"
     }
   }
   ```

2. **Create a new release on GitHub:**
   - Go to https://github.com/ELMOURABEA/pharmaintel-api/releases/new
   - Choose a tag (e.g., `v1.0.0`, `v1.1.0`)
   - Set the release title (e.g., "PharmaIntel API v1.0.0")
   - Add release notes describing changes
   - Click "Publish release"

3. **Automated workflow will:**
   - Run all tests
   - Publish package to GitHub Packages
   - Deploy to Cloud Run (if configured)

### Manual Publishing to GitHub Packages

If you need to publish manually:

```bash
# 1. Authenticate with GitHub Packages
npm login --registry=https://npm.pkg.github.com
# Username: your-github-username
# Password: your-github-personal-access-token (with packages:write scope)

# 2. Ensure you're on the latest commit
git pull origin main

# 3. Build and test
npm ci
npm test
npm run lint

# 4. Publish
npm publish --registry=https://npm.pkg.github.com
```

### Installing from GitHub Packages

Users can install the package from GitHub Packages:

```bash
# Configure npm to use GitHub Packages for @ELMOURABEA scope
npm config set @ELMOURABEA:registry https://npm.pkg.github.com

# Authenticate (requires GitHub PAT with packages:read scope)
npm login --registry=https://npm.pkg.github.com

# Install the package
npm install @ELMOURABEA/pharmaintel-api
```

## Publishing to NPM Registry

To publish to the public NPM registry:

### Setup

1. **Create an NPM account** at https://www.npmjs.com/signup

2. **Verify your email** address

3. **Login to NPM:**
   ```bash
   npm login
   ```

### Publishing

1. **Update package.json for NPM:**

   ```json
   {
     "name": "pharmaintel-api",
     "publishConfig": {
       "access": "public"
     }
   }
   ```

2. **Publish:**

   ```bash
   # Test the package first
   npm pack
   # This creates a .tgz file you can inspect

   # Publish to NPM
   npm publish --access public
   ```

3. **Verify publication:**
   ```bash
   npm view pharmaintel-api
   ```

### Publishing Scoped Packages

If you want to publish as a scoped package:

```json
{
  "name": "@elmourabea/pharmaintel-api",
  "publishConfig": {
    "access": "public"
  }
}
```

```bash
npm publish --access public
```

## Creating GitHub Releases

### Using GitHub Web Interface

1. Navigate to https://github.com/ELMOURABEA/pharmaintel-api/releases/new
2. Fill in the details:
   - **Tag version:** `v1.0.0` (follow semantic versioning)
   - **Release title:** `PharmaIntel API v1.0.0`
   - **Description:** Include:
     - What's new
     - Breaking changes
     - Bug fixes
     - Known issues
3. Attach any additional files (optional)
4. Click "Publish release"

### Using GitHub CLI

```bash
# Install GitHub CLI if not already installed
# https://cli.github.com/

# Create a release
gh release create v1.0.0 \
  --title "PharmaIntel API v1.0.0" \
  --notes "First production release with full API features" \
  --latest
```

### Release Notes Template

```markdown
## What's New in v1.0.0

### Features

- Drug interactions checking via DrugBank API
- FDA drug recalls search
- WHO health articles integration
- Comprehensive health monitoring endpoint

### Security

- Helmet.js for secure headers
- Rate limiting (60 req/min)
- Input validation on all endpoints

### Documentation

- Complete API documentation
- Deployment guides for multiple platforms
- OpenAPI 3.0 specification

### Deployment

- Automated CI/CD pipeline
- Docker containerization
- Google Cloud Run deployment

## Breaking Changes

None (initial release)

## Installation

### Docker

\`\`\`bash
docker pull ghcr.io/elmourabea/pharmaintel-api:v1.0.0
docker run -p 3000:3000 -e DRUGBANK_API_KEY=your_key ghcr.io/elmourabea/pharmaintel-api:v1.0.0
\`\`\`

### NPM/GitHub Packages

\`\`\`bash
npm install @elmourabea/pharmaintel-api@1.0.0
\`\`\`

## Documentation

- [README](https://github.com/ELMOURABEA/pharmaintel-api#readme)
- [API Documentation](https://github.com/ELMOURABEA/pharmaintel-api/blob/main/openapi.yaml)
- [Deployment Guide](https://github.com/ELMOURABEA/pharmaintel-api/blob/main/DEPLOYMENT.md)

## Support

Report issues at https://github.com/ELMOURABEA/pharmaintel-api/issues
```

## Docker Image Publishing

### GitHub Container Registry (GHCR)

1. **Create a GitHub Personal Access Token** with `write:packages` scope

2. **Login to GHCR:**

   ```bash
   echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
   ```

3. **Build and tag the image:**

   ```bash
   docker build -t ghcr.io/elmourabea/pharmaintel-api:v1.0.0 .
   docker tag ghcr.io/elmourabea/pharmaintel-api:v1.0.0 ghcr.io/elmourabea/pharmaintel-api:latest
   ```

4. **Push the image:**
   ```bash
   docker push ghcr.io/elmourabea/pharmaintel-api:v1.0.0
   docker push ghcr.io/elmourabea/pharmaintel-api:latest
   ```

### Docker Hub

1. **Login to Docker Hub:**

   ```bash
   docker login
   ```

2. **Build and tag:**

   ```bash
   docker build -t elmourabea/pharmaintel-api:v1.0.0 .
   docker tag elmourabea/pharmaintel-api:v1.0.0 elmourabea/pharmaintel-api:latest
   ```

3. **Push:**
   ```bash
   docker push elmourabea/pharmaintel-api:v1.0.0
   docker push elmourabea/pharmaintel-api:latest
   ```

### Automated Docker Publishing

Add to `.github/workflows/publish-docker.yml`:

```yaml
name: Publish Docker Image

on:
  release:
    types: [published]

jobs:
  push_to_registry:
    name: Push Docker image to GitHub Packages
    runs-on: ubuntu-latest
    permissions:
      packages: write
      contents: read
    steps:
      - name: Check out the repo
        uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}
          tags: |
            type=ref,event=tag
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
```

## API Marketplace Listings

### RapidAPI

1. **Create RapidAPI Provider Account:**
   - Sign up at https://rapidapi.com/provider
   - Complete provider profile

2. **Add New API:**
   - Navigate to "My APIs" → "Add New API"
   - Fill in API details:
     - **Name:** PharmaIntel API
     - **Category:** Health & Medical
     - **Description:** Pharmaceutical intelligence API providing drug interactions, FDA recalls, and WHO health articles

3. **Configure Endpoints:**
   - Import OpenAPI specification from `openapi.yaml`
   - Or manually add endpoints:
     - `GET /health`
     - `POST /api/interactions`
     - `GET /api/recalls`
     - `GET /api/who`

4. **Set Pricing:**
   - Basic (Free): 100 requests/month
   - Pro: 1000 requests/month at $9.99
   - Enterprise: Unlimited at $49.99

5. **Add Documentation:**
   - Import from README.md
   - Add code examples
   - Include error response examples

### Postman API Network

1. **Create Postman Account**

2. **Create Workspace and Collection**

3. **Import API:**
   - Import `openapi.yaml` into Postman
   - Or manually create requests

4. **Publish to Postman API Network:**
   - Click "Share Collection"
   - Select "Publish to Postman API Network"
   - Add detailed description and documentation

5. **Add Examples and Tests**

### AWS API Gateway Marketplace

1. **Set up AWS API Gateway**

2. **Import API Definition**

3. **Configure Usage Plans and API Keys**

4. **Publish to AWS Marketplace:**
   - Follow AWS Marketplace Seller Guide
   - Set up billing and pricing
   - Submit for review

## Pre-Publication Checklist

### Code Quality

- [ ] All tests passing (`npm test`)
- [ ] Code coverage > 80% (if applicable)
- [ ] Linting passing (`npm run lint`)
- [ ] Code formatted (`npm run format:check`)
- [ ] No console.log statements in production code
- [ ] All TypeScript types correct (if using TypeScript)

### Security

- [ ] Security audit passed (`npm audit --production`)
- [ ] No secrets in code or config files
- [ ] All dependencies up to date
- [ ] Security headers configured (Helmet.js)
- [ ] Rate limiting configured
- [ ] Input validation on all endpoints
- [ ] CORS properly configured for production

### Documentation

- [ ] README.md complete and accurate
- [ ] API documentation complete (OpenAPI spec)
- [ ] CHANGELOG.md updated
- [ ] LICENSE file present
- [ ] CONTRIBUTING.md present
- [ ] SECURITY.md present
- [ ] Deployment guide tested
- [ ] All code examples working

### Configuration

- [ ] Environment variables documented
- [ ] .env.example up to date
- [ ] Default values sensible
- [ ] Production config separate from development

### Testing

- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Manual testing completed
- [ ] Performance testing done
- [ ] Load testing performed (for production)

### Version Control

- [ ] Git repository clean
- [ ] All changes committed
- [ ] Version number updated in package.json
- [ ] Git tags created for version
- [ ] Release branch created (if applicable)

### Legal & Compliance

- [ ] License compatibility verified
- [ ] Third-party licenses acknowledged
- [ ] Privacy policy reviewed (if collecting data)
- [ ] Terms of service reviewed
- [ ] Copyright notices present

## Version Management

### Semantic Versioning

Follow semantic versioning (semver):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backwards compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backwards compatible

### Updating Version

```bash
# Patch release (bug fixes)
npm version patch

# Minor release (new features)
npm version minor

# Major release (breaking changes)
npm version major

# This will:
# 1. Update package.json version
# 2. Create a git commit
# 3. Create a git tag
```

### Publishing New Version

```bash
# 1. Update version
npm version minor -m "Release v%s: Added new features"

# 2. Push changes and tags
git push origin main
git push origin --tags

# 3. Create GitHub release (triggers automatic publishing)
gh release create v1.1.0 --title "v1.1.0" --notes "Release notes here"
```

## Monitoring After Publication

### Check Package Availability

```bash
# GitHub Packages
curl https://npm.pkg.github.com/@ELMOURABEA/pharmaintel-api

# NPM Registry
npm view pharmaintel-api

# Docker Registry
docker pull ghcr.io/elmourabea/pharmaintel-api:latest
```

### Monitor Downloads

- **GitHub:** Repository Insights → Traffic
- **NPM:** https://www.npmjs.com/package/pharmaintel-api
- **Docker Hub:** Repository statistics

### Track Issues and Feedback

- Monitor GitHub Issues
- Respond to user questions
- Track feature requests
- Monitor security advisories

## Rollback Procedure

If a release has critical issues:

### NPM/GitHub Packages

```bash
# Deprecate a version (doesn't unpublish)
npm deprecate pharmaintel-api@1.0.1 "Critical bug, use 1.0.2 instead"

# Unpublish (only within 72 hours)
npm unpublish pharmaintel-api@1.0.1
```

### GitHub Release

```bash
# Delete a release
gh release delete v1.0.1 --yes

# Delete the tag
git tag -d v1.0.1
git push origin :refs/tags/v1.0.1
```

### Docker Image

```bash
# Delete from GHCR
# Use GitHub web interface: Packages → Select package → Delete version

# Or use API
curl -X DELETE \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/user/packages/container/pharmaintel-api/versions/VERSION_ID
```

## Support and Maintenance

### Post-Publication Tasks

1. **Monitor first 24 hours** closely for issues
2. **Respond to GitHub issues** promptly
3. **Update documentation** based on feedback
4. **Plan next release** with roadmap
5. **Announce release** on social media, blog, etc.

### Regular Maintenance

- **Weekly:** Check for security advisories
- **Monthly:** Update dependencies
- **Quarterly:** Review and update documentation
- **Yearly:** Major version planning

## Resources

- [NPM Publishing Guide](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [Docker Registry Documentation](https://docs.docker.com/registry/)
- [Semantic Versioning](https://semver.org/)
- [Creating GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)

---

**Last Updated:** November 19, 2025  
**Version:** 1.0.0

For questions or issues with publishing, please open an issue at https://github.com/ELMOURABEA/pharmaintel-api/issues
