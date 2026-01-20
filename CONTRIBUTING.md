# Contributing to n8n Workflow Manipulator

Thank you for considering contributing to this project! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/workflown8n.git
   cd workflown8n
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running Locally

```bash
# Start the web app in development mode
npm run dev

# Build the extension
npm run build:extension
```

### Making Changes

1. **Make your changes** in the appropriate files
2. **Test your changes** thoroughly
3. **Build to ensure no errors**:
   ```bash
   npm run build
   ```

### Code Style

- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Write clear, descriptive variable names
- Add comments for complex logic
- Keep functions small and focused

## Types of Contributions

### 🐛 Bug Reports

When filing a bug report, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS, n8n version)

### ✨ Feature Requests

When suggesting a feature:
- Explain the problem it solves
- Describe the proposed solution
- Consider alternatives
- Note any breaking changes

### 🔧 Code Contributions

#### Web App Components
- Located in `webapp/src/components/`
- Use React functional components
- Follow existing CSS patterns

#### Services
- Located in `webapp/src/services/`
- Keep API clients modular
- Handle errors gracefully

#### Chrome Extension
- Manifest: `extension/public/manifest.json`
- Background: `extension/src/background.js`
- Content: `extension/src/content.js`
- Popup: `extension/src/popup.js`

### 📚 Documentation

- Update README.md for major changes
- Keep QUICKSTART.md current
- Add code comments where helpful

## Commit Guidelines

### Commit Message Format
```
type(scope): Brief description

Longer description if needed

- Bullet points for details
- Reference issues with #123
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding tests
- `chore`: Updating build tasks, package manager configs, etc.

### Examples
```
feat(webapp): Add workflow export functionality

fix(extension): Resolve canvas detection on n8n v2.0

docs(readme): Update installation instructions
```

## Pull Request Process

1. **Update documentation** if needed
2. **Ensure builds pass**:
   ```bash
   npm run build
   npm run build:extension
   ```
3. **Create a pull request** with:
   - Clear title and description
   - Link to related issues
   - Screenshots for UI changes
   - List of changes made

4. **Respond to feedback** promptly
5. **Keep your branch updated** with main:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

## Testing

Currently, the project doesn't have automated tests, but you should:
- Manually test all changed functionality
- Test with actual n8n instances
- Verify extension works in Chrome
- Check for console errors

### Manual Testing Checklist

Web App:
- [ ] Configuration saves correctly
- [ ] API calls work with valid keys
- [ ] LLM processing generates valid JSON
- [ ] Workflow viewer displays correctly
- [ ] Error messages are clear

Extension:
- [ ] Loads in Chrome without errors
- [ ] Detects n8n pages correctly
- [ ] Canvas state extraction works
- [ ] Popup UI is responsive
- [ ] Settings persist

## Code Review

All contributions will be reviewed for:
- Code quality and style
- Functionality and correctness
- Performance implications
- Security considerations
- Documentation completeness

## Security

- **Never commit API keys or secrets**
- **Report security issues privately** to the maintainers
- **Follow secure coding practices**
- **Validate and sanitize all inputs**

## License

By contributing, you agree that your contributions will be licensed under the project's ISC License.

## Questions?

- Open an issue for questions
- Tag maintainers if urgent
- Check existing issues first

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes
- README acknowledgments

Thank you for contributing! 🎉
