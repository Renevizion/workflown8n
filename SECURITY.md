# Security Considerations

## ⚠️ Important Security Notices

This project is designed for **personal use** and **development environments**. Before deploying to production or sharing publicly, please review these security considerations.

## Known Security Limitations

### 1. Client-Side API Key Storage

**Issue**: API keys are stored in browser localStorage and used directly from the client.

**Risk**: 
- API keys can be extracted from browser storage
- Keys are exposed in network requests (visible in DevTools)
- Anyone with access to the browser can steal keys

**Mitigations**:
- Use this tool only on trusted devices
- Don't share your browser profile
- Rotate API keys regularly
- Monitor API usage for anomalies

**Production Solution**:
- Implement a backend proxy server
- Store keys server-side only
- Use session tokens for client authentication
- Implement rate limiting

### 2. LLM API Calls from Browser

**Issue**: OpenAI and Anthropic API calls are made directly from the browser using `dangerouslyAllowBrowser: true`.

**Risk**:
- API keys visible in browser memory
- Possible CORS issues
- No rate limiting or cost controls

**Mitigations**:
- Monitor your LLM API usage dashboards
- Set spending limits in OpenAI/Anthropic accounts
- Use separate API keys for this tool
- Revoke keys when not in use

**Production Solution**:
```
Browser → Your Backend API → LLM Provider
        ↑ Auth Token      ↑ API Key (secure)
```

### 3. Chrome Extension Permissions

**Issue**: Extension requests broad permissions (`host_permissions: ["https://*/", "http://*/"]`)

**Risk**:
- Extension can access all websites
- Potential for abuse if compromised

**Mitigations**:
- Only use the extension on n8n pages
- Review extension code before loading
- Load from source (not unknown packages)

**Production Solution**:
- Narrow host_permissions to specific n8n domains
- Use optional_permissions for additional hosts
- Implement Content Security Policy

### 4. n8n API Key Transmission

**Issue**: n8n API key is sent in plain headers without additional authentication.

**Risk**:
- Keys can be intercepted if HTTPS is not used
- No request signing or verification

**Mitigations**:
- **Always use HTTPS** for n8n instances
- Use VPN on untrusted networks
- Implement IP whitelisting on n8n if possible
- Monitor n8n audit logs

**Production Solution**:
- Implement request signing (HMAC)
- Add timestamp-based nonce to prevent replay attacks
- Use short-lived tokens with refresh mechanism

## Recommended Security Setup

### For Personal Use (Current Implementation)
```
✅ Use only on personal devices
✅ Enable HTTPS everywhere
✅ Use separate API keys for this tool
✅ Set spending limits on LLM accounts
✅ Regularly rotate all API keys
✅ Monitor API usage dashboards
❌ Don't use on public computers
❌ Don't commit .env files
❌ Don't share your configured browser
```

### For Team/Production Use
```
✅ Implement backend proxy
✅ Use OAuth/JWT for authentication
✅ Server-side API key storage
✅ Rate limiting and quotas
✅ Audit logging
✅ Regular security audits
✅ HTTPS only (enforce with HSTS)
✅ Content Security Policy
```

## Implementing a Secure Backend Proxy

### Architecture
```
Client (Browser) → Backend Proxy → External APIs
                      ↓
                   Database (for keys)
```

### Example Backend (Node.js/Express)
```javascript
// server.js
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Authentication middleware
app.use((req, res, next) => {
  const token = req.headers['authorization'];
  // Verify JWT token
  if (!verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// n8n proxy
app.post('/api/n8n/*', async (req, res) => {
  const apiKey = process.env.N8N_API_KEY; // Server-side only
  // Forward request with server-stored key
});

// LLM proxy
app.post('/api/llm/process', async (req, res) => {
  const llmKey = process.env.OPENAI_API_KEY; // Server-side only
  // Process with rate limiting
});

app.listen(3001);
```

### Update Client Code
```javascript
// Instead of direct API calls
const response = await fetch('/api/n8n/workflows', {
  headers: {
    'Authorization': `Bearer ${sessionToken}`
  }
});
```

## Security Checklist

Before using in production:

- [ ] Implement backend proxy for API calls
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS with valid certificates
- [ ] Implement proper authentication (OAuth/JWT)
- [ ] Add rate limiting on all endpoints
- [ ] Implement audit logging
- [ ] Set up monitoring and alerts
- [ ] Regular security updates
- [ ] Code security audit/penetration testing
- [ ] Implement Content Security Policy
- [ ] Set up Web Application Firewall (WAF)
- [ ] Regular backup of configurations
- [ ] Disaster recovery plan

## Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public GitHub issue
2. Email the maintainers privately
3. Include detailed description and reproduction steps
4. Allow time for a fix before public disclosure

## API Key Best Practices

### Creating Keys
- Use descriptive names (e.g., "n8n-tool-dev", "n8n-tool-prod")
- Set expiration dates where possible
- Limit key permissions to minimum required

### Storing Keys
- Never commit to version control
- Use environment variables
- Use secure secret management (AWS Secrets Manager, HashiCorp Vault)
- Encrypt at rest

### Rotating Keys
- Rotate every 90 days minimum
- Rotate immediately if compromised
- Keep rotation schedule documented
- Have zero-downtime rotation process

### Monitoring Keys
- Set up usage alerts
- Review audit logs regularly
- Monitor for unusual patterns
- Set spending limits

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Chrome Extension Security](https://developer.chrome.com/docs/extensions/mv3/security/)
- [n8n Security Best Practices](https://docs.n8n.io/hosting/security/)
- [API Security Best Practices](https://github.com/OWASP/API-Security)

## Disclaimer

This tool is provided "as is" without warranty. Users are responsible for:
- Securing their API keys
- Monitoring usage and costs
- Implementing additional security measures
- Compliance with relevant regulations
- Following terms of service for n8n, OpenAI, and Anthropic

Use at your own risk. Always test in a safe environment first.
