# Chrome Extension Installation Guide

This guide will walk you through installing the n8n Interface Manipulator Chrome extension.

## Prerequisites

- Google Chrome browser (version 88 or later)
- Built extension files (see [Building](#building-the-extension))

## Building the Extension

Before you can install the extension, you need to build it:

```bash
# Navigate to the repository root
cd workflown8n

# Install dependencies
npm install
cd chrome-extension
npm install

# Build the extension
npm run build
```

This will create a `dist` folder in the `chrome-extension` directory with all the necessary files.

## Installation Steps

### 1. Open Chrome Extensions Page

- Open Google Chrome
- Navigate to `chrome://extensions/`
- Or click the three-dot menu → More tools → Extensions

### 2. Enable Developer Mode

- Look for the "Developer mode" toggle in the top-right corner
- Click to enable it

### 3. Load the Extension

- Click the "Load unpacked" button that appears
- Navigate to the `chrome-extension/dist` folder in your file browser
- Select the folder and click "Select" or "Open"

### 4. Verify Installation

You should now see the "n8n Interface Manipulator" extension in your extensions list with:
- Name: n8n Interface Manipulator
- Version: 1.0.0
- Status: Enabled

## Configuring the Extension

### 1. Click the Extension Icon

- Find the extension icon in your Chrome toolbar
- Click it to open the popup

### 2. Enter Your n8n Configuration

- **n8n Instance URL**: Enter your n8n instance URL (e.g., `https://your-n8n-instance.com`)
- **API Key**: Enter your n8n Public API Key

### 3. Save Configuration

- Click "Save Configuration"
- Your settings will be stored locally in Chrome storage

## Using the Extension

### Reading Canvas State

1. Navigate to your n8n instance in Chrome
2. Open a workflow
3. Click the extension icon
4. Click "Read Canvas State"
5. The extension will inject code to read the current workflow canvas

### How It Works

The extension provides three main components:

1. **Content Script** (`content.js`)
   - Injects into all web pages
   - Detects n8n canvas elements
   - Reads node positions and workflow structure
   - Observes DOM changes using MutationObserver

2. **Background Script** (`background.js`)
   - Service worker that handles API requests
   - Proxies communication between content script and n8n API
   - Manages extension lifecycle

3. **Popup UI** (`popup/index.html`)
   - Configuration interface
   - Action buttons for canvas manipulation
   - Status display

## Features

- ✅ **DOM Injection**: Reads current state of n8n canvas
- ✅ **Real-time Canvas Reading**: Detects nodes and workflow structure
- ✅ **API Integration**: Pushes changes via n8n Public API
- ✅ **Secure Storage**: API keys stored in Chrome local storage
- ✅ **Automatic Detection**: Monitors for n8n canvas elements

## Troubleshooting

### Extension Not Appearing

- Make sure Developer mode is enabled
- Verify the `dist` folder contains `manifest.json`
- Check Chrome console for any errors

### Canvas Reading Not Working

- Ensure you're on an n8n workflow page
- Check that your n8n instance URL is correctly configured
- Open browser console (F12) to check for errors

### API Calls Failing

- Verify your API key is correct
- Ensure your n8n instance URL is accessible
- Check that API access is enabled on your n8n instance
- Look for CORS errors in the browser console

### Permissions

The extension requires the following permissions:

- **storage**: To save API configuration locally
- **activeTab**: To interact with the current tab
- **scripting**: To inject content scripts
- **host_permissions**: To access n8n instances on any domain

## Security Notes

- API keys are stored locally in Chrome storage
- Keys are never transmitted except to your configured n8n instance
- Always use HTTPS for your n8n instance URL
- The extension can access all websites to detect n8n instances

## Updating the Extension

When you make changes to the extension code:

1. Rebuild the extension: `npm run build`
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card

## Uninstalling

1. Go to `chrome://extensions/`
2. Find "n8n Interface Manipulator"
3. Click "Remove"
4. Confirm the removal

## Development Mode

For development, you can use the watch mode:

```bash
cd chrome-extension
npm run dev
```

This will rebuild the extension automatically when you make changes. You'll still need to refresh the extension in Chrome after each rebuild.

## Support

For issues and questions:
- Check the main [README.md](../README.md)
- Review the [n8n API Documentation](https://docs.n8n.io/api/)
- Open an issue on GitHub

---

**Note**: This extension is for development and testing purposes. Always review and test changes in a non-production environment first.
