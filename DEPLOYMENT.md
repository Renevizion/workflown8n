# Deployment Guide

This guide covers deploying the n8n Workflow Manipulator to various environments.

## Web Application Deployment

### Option 1: Static Hosting (Recommended for Personal Use)

#### Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Build the app:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   vercel dist/webapp
   ```

#### Netlify
1. Build the app:
   ```bash
   npm run build
   ```

2. Deploy via Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --dir=dist/webapp --prod
   ```

Or drag and drop the `dist/webapp` folder to Netlify's web interface.

#### GitHub Pages
1. Add to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/workflown8n"
   }
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deploy script:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist/webapp"
     }
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Option 2: Self-Hosted with Docker

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/webapp /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t n8n-manipulator .
docker run -p 8080:80 n8n-manipulator
```

### Option 3: Node.js Server (for Backend Proxy)

For production use with secure backend, create `server.js`:
```javascript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'dist/webapp')));

// API proxy endpoints (add authentication here)
app.post('/api/n8n/*', async (req, res) => {
  // Implement secure proxy
});

app.post('/api/llm/process', async (req, res) => {
  // Implement secure proxy
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/webapp/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Deploy to:
- Heroku
- Railway
- Render
- DigitalOcean App Platform
- AWS Elastic Beanstalk

## Chrome Extension Distribution

### Option 1: Developer Mode (Personal Use)

1. Build extension:
   ```bash
   npm run build:extension
   ```

2. Load in Chrome:
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select `extension/dist/` folder

### Option 2: Private Distribution (Team)

1. **Zip the extension**:
   ```bash
   cd extension/dist
   zip -r extension.zip .
   ```

2. **Share via Google Groups**:
   - Create a Google Group for your team
   - Upload extension.zip to Google Drive
   - Share with group members

3. **Install**:
   - Drag and drop extension.zip to `chrome://extensions/`

### Option 3: Chrome Web Store (Public)

1. **Prepare for submission**:
   - Create promotional images (128x128, 440x280, 1400x560)
   - Write store description
   - Create privacy policy
   - Set up support page

2. **Register as developer**:
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Pay one-time $5 registration fee

3. **Submit extension**:
   ```bash
   npm run build:extension
   cd extension/dist
   zip -r extension.zip .
   ```
   - Upload extension.zip to dashboard
   - Fill in all required information
   - Submit for review (typically 1-3 days)

4. **Update privacy policy** to include:
   - Data collection practices
   - How API keys are stored
   - Third-party services used (n8n, OpenAI, Anthropic)

## Environment Variables

### Production Environment

Create `.env.production`:
```env
# For backend proxy setup
N8N_API_URL=https://your-n8n-instance.com
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here

# Optional: Rate limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000

# Optional: Authentication
JWT_SECRET=your_jwt_secret
```

**Never commit this file!** Use platform-specific environment variable management:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- Heroku: `heroku config:set KEY=value`
- Docker: Use `--env-file` or `-e` flags

## SSL/TLS Configuration

### For Self-Hosted Deployments

Use Let's Encrypt with Nginx:

1. Install Certbot:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. Obtain certificate:
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. Auto-renewal:
   ```bash
   sudo certbot renew --dry-run
   ```

## Monitoring and Logging

### Application Monitoring

1. **Error Tracking**: Use Sentry
   ```bash
   npm install @sentry/react
   ```

2. **Analytics**: Use Google Analytics or Plausible
   ```javascript
   // In webapp/src/main.jsx
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: "your-dsn",
     environment: "production"
   });
   ```

3. **Performance**: Monitor with Web Vitals
   ```javascript
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
   
   getCLS(console.log);
   getFID(console.log);
   getFCP(console.log);
   getLCP(console.log);
   getTTFB(console.log);
   ```

### Server Monitoring

For Node.js backend:
- Use PM2 for process management
- Log aggregation with Winston or Pino
- APM with New Relic or Datadog

## CI/CD Pipeline

The included GitHub Actions workflow (`.github/workflows/build.yml`) automatically:
- Builds on push to main/develop branches
- Tests on multiple Node versions
- Creates build artifacts

### Extend for Deployment

Add deployment steps to workflow:

```yaml
- name: Deploy to Vercel
  if: github.ref == 'refs/heads/main'
  run: |
    npm install -g vercel
    vercel --token ${{ secrets.VERCEL_TOKEN }} --prod
```

## Backup and Recovery

### Backup Configuration

Users should export their settings:
```javascript
// Add export function in webapp
const exportConfig = () => {
  const config = {
    n8nUrl: localStorage.getItem('n8nUrl'),
    llmProvider: localStorage.getItem('llmProvider'),
  };
  // Don't export API keys!
  const blob = new Blob([JSON.stringify(config)], {
    type: 'application/json'
  });
  // Download
};
```

### Recovery Plan

1. Keep configuration backups
2. Document n8n instance URLs
3. Store API keys securely (password manager)
4. Regular workflow exports from n8n

## Performance Optimization

### Build Optimization

1. **Code Splitting**:
   ```javascript
   // In vite.config.js
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             llm: ['openai', '@anthropic-ai/sdk']
           }
         }
       }
     }
   });
   ```

2. **Compression**:
   ```bash
   npm install --save-dev vite-plugin-compression
   ```

3. **Asset Optimization**:
   - Minimize images
   - Use WebP format
   - Lazy load heavy components

### Runtime Optimization

1. **Caching**:
   - Cache API responses
   - Use React.memo for expensive components
   - Implement service worker for offline support

2. **Bundle Analysis**:
   ```bash
   npm install --save-dev rollup-plugin-visualizer
   npm run build -- --stats
   ```

## Security Hardening

### Content Security Policy

Add to HTML or server headers:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               connect-src 'self' https://api.openai.com https://api.anthropic.com">
```

### HTTP Security Headers

For Nginx:
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

## Troubleshooting Deployment

### Common Issues

1. **CORS errors**:
   - Ensure n8n instance allows your domain
   - Configure backend proxy if needed

2. **Build failures**:
   - Check Node version (requires 18+)
   - Clear node_modules and reinstall
   - Check for platform-specific dependencies

3. **Extension not loading**:
   - Verify manifest.json is valid
   - Check icon paths are correct
   - Review Chrome console for errors

4. **API timeouts**:
   - Increase timeout limits
   - Implement request queuing
   - Add retry logic

## Scaling Considerations

For high-traffic deployments:

1. **CDN**: Use Cloudflare or AWS CloudFront
2. **Load Balancing**: Multiple server instances
3. **Database**: Store user configurations
4. **Queue System**: For background LLM processing
5. **Caching Layer**: Redis for API responses

## Cost Estimation

### Static Hosting (Personal)
- Vercel/Netlify: Free tier usually sufficient
- Domain: ~$10-15/year

### Self-Hosted (Small Team)
- VPS (DigitalOcean, Linode): $5-20/month
- Domain + SSL: Free (Let's Encrypt)

### Production (Large Scale)
- Hosting: $50-200/month
- CDN: $20-100/month
- Monitoring: $30-100/month
- LLM API costs: Variable (usage-based)

## Maintenance

### Regular Tasks

- **Weekly**: Check error logs
- **Monthly**: Update dependencies
- **Quarterly**: Security audit
- **Annually**: Review architecture

### Update Process

1. Test in staging environment
2. Create backup
3. Deploy during low-traffic period
4. Monitor for errors
5. Rollback plan ready

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Chrome Extension Publishing](https://developer.chrome.com/docs/webstore/publish/)
- [n8n Deployment Guide](https://docs.n8n.io/hosting/)

For additional help, see [SECURITY.md](SECURITY.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
