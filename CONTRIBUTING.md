# Contributing to PharmaIntel API

Thank you for your interest in contributing to PharmaIntel API! This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Environment details** (OS, Node.js version, npm version)
- **Error messages** or logs if applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - why is this enhancement needed?
- **Proposed solution** or implementation approach
- **Alternative solutions** considered

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**:
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed
4. **Test your changes**:
   ```bash
   npm test
   npm start  # Verify the app runs
   ```
5. **Commit your changes**:
   ```bash
   git commit -m "Brief description of your changes"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** with:
   - Clear description of the changes
   - Reference to related issues
   - Screenshots (if UI changes)

## Development Setup

1. **Prerequisites**:
   - Node.js 18+
   - npm 8+

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment**:

   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Run in development mode**:
   ```bash
   npm run dev
   ```

## Code Style Guidelines

- Use **ES6+** JavaScript features
- Use **async/await** for asynchronous operations
- Use **meaningful variable names**
- Add **comments** for complex logic
- Keep functions **small and focused**
- Follow **DRY** (Don't Repeat Yourself) principle

### Code Structure

```
pharmaintel-api/
├── app.js              # Main application entry point
├── routes/             # API route handlers
├── services/           # Business logic and external API integrations
├── tests/              # Test files
└── middleware/         # Custom middleware (if needed)
```

## Testing Guidelines

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for meaningful test coverage
- Use descriptive test names

```bash
npm test
```

## Documentation

- Update README.md if adding new features
- Add JSDoc comments for functions
- Update API documentation for endpoint changes

## Commit Message Guidelines

Use clear and meaningful commit messages:

```
feat: Add authentication middleware
fix: Correct rate limiting configuration
docs: Update API documentation
test: Add tests for WHO endpoint
refactor: Simplify error handling
```

Prefixes:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `chore`: Maintenance tasks

## Questions?

Feel free to open an issue for any questions about contributing.

## License

By contributing, you agree that your contributions will be licensed under the ISC License.
