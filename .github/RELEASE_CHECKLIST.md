# Release Checklist

Use this checklist before creating a new release of PharmaIntel API.

## Pre-Release Verification

### Code Quality

- [ ] All tests passing locally (`npm test`)
- [ ] Linting passing (`npm run lint`)
- [ ] Code formatting correct (`npm run format:check`)
- [ ] No console.log or debug statements in production code
- [ ] All CI checks passing on main branch

### Security

- [ ] Security audit passed (`npm audit --production`)
- [ ] No secrets committed to repository
- [ ] Dependencies reviewed and up to date
- [ ] SECURITY.md reviewed and current

### Documentation

- [ ] CHANGELOG.md updated with new version changes
- [ ] README.md accurate and complete
- [ ] OpenAPI spec (openapi.yaml) up to date
- [ ] All new features documented
- [ ] Breaking changes clearly documented

### Version Management

- [ ] Version number updated in package.json (using `npm version`)
- [ ] Version follows semantic versioning (MAJOR.MINOR.PATCH)
- [ ] Git tag created matching version number
- [ ] All changes committed and pushed

### Testing

- [ ] Manual testing completed on development environment
- [ ] All API endpoints tested manually
- [ ] Health endpoint responding correctly
- [ ] Error handling verified
- [ ] External API integrations tested (if possible)

## Release Process

### 1. Update Version

```bash
# For bug fixes
npm version patch -m "Release v%s: Bug fixes"

# For new features (backwards compatible)
npm version minor -m "Release v%s: New features"

# For breaking changes
npm version major -m "Release v%s: Breaking changes"
```

### 2. Push Changes

```bash
git push origin main
git push origin --tags
```

### 3. Create GitHub Release

- [ ] Go to https://github.com/ELMOURABEA/pharmaintel-api/releases/new
- [ ] Select the version tag (e.g., v1.0.0)
- [ ] Set release title: "PharmaIntel API vX.X.X"
- [ ] Add release notes using template below
- [ ] Mark as pre-release if appropriate
- [ ] Publish release

### 4. Verify Automated Publishing

- [ ] GitHub Actions workflows completed successfully
- [ ] Package published to GitHub Packages
- [ ] Docker image published to GHCR
- [ ] Cloud Run deployment succeeded (if configured)

### 5. Post-Release Verification

- [ ] Package installable from GitHub Packages
- [ ] Docker image pullable from GHCR
- [ ] Deployed service responding correctly
- [ ] Health endpoint accessible
- [ ] API endpoints functioning as expected

## Release Notes Template

```markdown
## What's New in vX.X.X

### ✨ New Features

- Feature 1 description
- Feature 2 description

### 🐛 Bug Fixes

- Bug fix 1 description
- Bug fix 2 description

### 🔒 Security

- Security improvement 1
- Security improvement 2

### 📚 Documentation

- Documentation update 1
- Documentation update 2

### ⚙️ Internal Changes

- Internal change 1
- Internal change 2

### 🚨 Breaking Changes

⚠️ **Important:** This release contains breaking changes

- Breaking change 1 description and migration guide
- Breaking change 2 description and migration guide

### 📦 Dependencies

- Updated dependency1 to vX.X.X
- Updated dependency2 to vX.X.X

## Installation

### Docker

\`\`\`bash
docker pull ghcr.io/elmourabea/pharmaintel-api:vX.X.X
docker run -p 3000:3000 -e DRUGBANK_API_KEY=your_key ghcr.io/elmourabea/pharmaintel-api:vX.X.X
\`\`\`

### NPM/GitHub Packages

\`\`\`bash
npm install @elmourabea/pharmaintel-api@X.X.X
\`\`\`

## Upgrading

Instructions for upgrading from previous version (if needed).

## Contributors

Thanks to all contributors for this release!

## Full Changelog

**Full Changelog**: https://github.com/ELMOURABEA/pharmaintel-api/compare/vX.X.X...vX.X.X
```

## Rollback Procedure

If critical issues are discovered after release:

### 1. Assess Severity

- [ ] Document the issue
- [ ] Determine impact on users
- [ ] Decide if rollback is necessary

### 2. Deprecate Package (if needed)

```bash
npm deprecate @elmourabea/pharmaintel-api@X.X.X "Critical issue found, use vX.X.X instead"
```

### 3. Update Documentation

- [ ] Update README with known issues
- [ ] Update CHANGELOG with errata
- [ ] Post notification on GitHub Discussions/Issues

### 4. Prepare Hotfix

- [ ] Create hotfix branch from affected version
- [ ] Fix critical issue
- [ ] Test thoroughly
- [ ] Release hotfix version (X.X.X+1)

## Post-Release Tasks

### Immediate (Within 24 hours)

- [ ] Monitor GitHub Actions for any failures
- [ ] Monitor GitHub Issues for bug reports
- [ ] Test package installation from registries
- [ ] Verify deployed service stability

### Short Term (Within 1 week)

- [ ] Monitor usage metrics
- [ ] Respond to community feedback
- [ ] Update documentation based on feedback
- [ ] Plan next release if needed

### Communication

- [ ] Announce release on GitHub Discussions (if enabled)
- [ ] Update project website/blog (if applicable)
- [ ] Notify users through relevant channels
- [ ] Update marketplace listings (RapidAPI, etc.)

## Resources

- [PUBLISHING.md](../../PUBLISHING.md) - Complete publishing guide
- [DEPLOYMENT.md](../../DEPLOYMENT.md) - Deployment instructions
- [CHANGELOG.md](../../CHANGELOG.md) - Version history
- [Semantic Versioning](https://semver.org/) - Version numbering guide

---

**Note:** Complete this checklist for every release to ensure quality and consistency.
