# Quick Start Guide

Get started with the n8n Interface Manipulator in 5 minutes!

## Prerequisites

- Node.js 18 or later
- npm
- Chrome browser (for the extension)
- An n8n instance with API access

## Quick Setup

### 1. Clone and Install

```bash
git clone https://github.com/Renevizion/workflown8n.git
cd workflown8n
npm install
```

### 2. Build Everything

```bash
npm run build
```

This builds both the web app and Chrome extension.

## Using the Web App

### Start the Development Server

```bash
cd web-app
npm run dev
```

Open http://localhost:5173 in your browser.

### Configure n8n API

1. Enter your n8n instance URL (e.g., `https://your-n8n.com`)
2. Enter your n8n API key
3. Click "Save Configuration"

### Manage Workflows

- View all your workflows
- Create new workflows
- See workflow details (nodes, status, etc.)

## Using the Chrome Extension

### Install the Extension

1. Build was already done in step 2 above
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top-right toggle)
4. Click "Load unpacked"
5. Select the `chrome-extension/dist` folder

### Configure the Extension

1. Click the extension icon in Chrome toolbar
2. Enter your n8n instance URL
3. Enter your n8n API key
4. Click "Save Configuration"

### Use DOM Injection

1. Navigate to your n8n instance
2. Open a workflow
3. Click the extension icon
4. Click "Read Canvas State"

The extension will read the current workflow canvas and show you the results!

## Getting Your n8n API Key

1. Log into your n8n instance
2. Click your user icon (top-right)
3. Go to Settings → API
4. Click "Create API Key"
5. Copy the key and use it in the web app or extension

## What You Can Do

### With the Web App
✅ Manage workflows from a dashboard  
✅ Create new workflows programmatically  
✅ View workflow details and status  
✅ Update workflow metadata  

### With the Chrome Extension
✅ Read n8n canvas state in real-time  
✅ Detect nodes and their positions  
✅ Monitor workflow changes  
✅ Inject nodes via API  

## Troubleshooting

**Build Fails?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Can't Connect to n8n API?**
- Verify your API key is correct
- Check your n8n instance URL
- Ensure API access is enabled on your n8n instance
- Try accessing the URL in your browser first

**Extension Not Loading?**
- Make sure you built the extension: `npm run build`
- Check that the `chrome-extension/dist` folder exists
- Verify Developer mode is enabled in Chrome

## Next Steps

- Read the [full README](README.md) for detailed information
- Check out [FEATURES.md](FEATURES.md) for architecture details
- See [chrome-extension/INSTALLATION.md](chrome-extension/INSTALLATION.md) for extension details

## Need Help?

- Check the troubleshooting section in README.md
- Review the n8n API documentation
- Open an issue on GitHub

---

Happy automating! 🚀
