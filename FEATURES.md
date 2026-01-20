# n8n Interface Manipulator - Features & Architecture

This document provides detailed information about the features, architecture, and implementation of the n8n Interface Manipulator.

## Overview

The n8n Interface Manipulator is a dual-component system consisting of:
1. A React web application for workflow management
2. A Chrome extension for DOM injection and real-time canvas manipulation

Both components leverage the n8n Public API (2026 version) to programmatically create and update workflows.

## Core Features

### 1. Direct API Access

Both the web app and Chrome extension provide direct access to the n8n Public API.

**Supported API Operations:**
- List all workflows
- Get workflow details
- Create new workflows
- Update existing workflows
- Delete workflows
- Activate/deactivate workflows
- Add nodes to workflows

**Authentication:**
Uses the `X-N8N-API-KEY` header for secure authentication.

**Example API Client Usage:**
```javascript
const client = new N8nApiClient('https://your-n8n.com', 'your-api-key');
const workflows = await client.getWorkflows();
const newWorkflow = await client.createWorkflow({
  name: 'My Workflow',
  nodes: [],
  connections: {}
});
```

### 2. DOM Injection (Chrome Extension)

The Chrome extension injects code into browser tabs to read and manipulate the n8n canvas.

**Capabilities:**
- Detects n8n canvas elements automatically
- Reads node positions and types
- Extracts workflow structure
- Monitors DOM changes in real-time
- Pushes changes back via API

**How It Works:**
1. Content script injects into all web pages
2. MutationObserver watches for n8n canvas elements
3. When detected, reads canvas state using DOM queries
4. Extracts node information (id, name, type, position)
5. Communicates with background script
6. Background script uses API to push changes

**Canvas Detection:**
```javascript
const canvas = document.querySelector('[data-test-id="canvas"]') || 
               document.querySelector('.canvas-container') ||
               document.querySelector('#canvas');
```

### 3. Real-time Canvas Reading

The extension continuously monitors the n8n canvas for changes.

**Monitored Elements:**
- Node elements (with data attributes)
- Node positions
- Connection elements
- Workflow metadata

**Data Structure:**
```javascript
{
  nodes: [
    {
      id: 'node-1',
      name: 'Start Node',
      type: 'n8n-nodes-base.start',
      position: { x: 100, y: 200 }
    }
  ],
  connections: [],
  viewport: {}
}
```

### 4. Local Storage Configuration

Both components store configuration locally:

**Web App:** Uses `localStorage`
- `n8n_api_key`: API key
- `n8n_api_url`: Instance URL

**Chrome Extension:** Uses `chrome.storage.local`
- `n8n_api_key`: API key
- `n8n_api_url`: Instance URL
- `extensionEnabled`: Extension state

## Architecture

### Web Application Architecture

```
web-app/
├── src/
│   ├── components/
│   │   ├── ApiKeySetup.jsx      # Initial configuration
│   │   └── WorkflowManager.jsx  # Main management UI
│   ├── services/
│   │   └── N8nApiClient.js      # API client wrapper
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # Entry point
└── index.html
```

**Component Flow:**
1. App loads and checks for saved configuration
2. If no config: Shows ApiKeySetup
3. If configured: Shows WorkflowManager
4. WorkflowManager uses N8nApiClient for API calls
5. UI updates based on API responses

### Chrome Extension Architecture

```
chrome-extension/
├── src/
│   ├── popup/              # Extension popup UI
│   │   ├── Popup.jsx
│   │   └── popup.jsx
│   ├── content/            # DOM injection
│   │   └── content.js
│   └── background/         # Service worker
│       └── background.js
├── public/
│   └── manifest.json       # Extension manifest
└── dist/                   # Built extension
```

**Component Communication:**

```
Popup UI → chrome.storage → Background Script
    ↓
Content Script → DOM Reading → Background Script → n8n API
```

**Message Flow:**
1. User clicks extension icon → Popup opens
2. User configures API → Saved to chrome.storage
3. User clicks "Read Canvas" → Message to content script
4. Content script reads DOM → Returns data to popup
5. Background script proxies API requests

### API Client Design

The `N8nApiClient` class provides a clean interface to the n8n API:

**Methods:**
- `getWorkflows()`: List all workflows
- `getWorkflow(id)`: Get specific workflow
- `createWorkflow(workflow)`: Create new workflow
- `updateWorkflow(id, workflow)`: Update workflow
- `deleteWorkflow(id)`: Delete workflow
- `activateWorkflow(id)`: Activate workflow
- `deactivateWorkflow(id)`: Deactivate workflow
- `addNodeToWorkflow(workflowId, node)`: Add node

**Error Handling:**
- Network errors wrapped in descriptive messages
- HTTP errors include status code and response text
- All errors propagated to UI for display

## Security Considerations

### API Key Storage

**Web App:**
- Keys stored in browser localStorage
- Accessible only to same-origin pages
- Not transmitted except to configured n8n instance

**Chrome Extension:**
- Keys stored in chrome.storage.local
- Isolated per-extension storage
- Encrypted by Chrome

### Permissions

**Extension Permissions:**
- `storage`: For saving configuration
- `activeTab`: To read current tab
- `scripting`: To inject content scripts
- `host_permissions`: To access any website (for n8n detection)

**Security Best Practices:**
- Always use HTTPS for n8n instance URLs
- Validate URLs before making API calls
- Never log or transmit API keys
- Clear sensitive data on configuration reset

## Performance Optimization

### Web App
- Component-level state management
- Lazy loading of workflow data
- Debounced API calls
- Error boundaries for graceful degradation

### Chrome Extension
- Content script runs only on document_end
- MutationObserver efficiently watches DOM changes
- Background script uses service worker (lightweight)
- Minimal memory footprint

## Browser Compatibility

**Web App:**
- Modern browsers with ES6+ support
- React 18 compatible
- CSS Grid and Flexbox layouts

**Chrome Extension:**
- Chrome 88+ (Manifest V3)
- Edge 88+ (Chromium-based)
- Other Chromium browsers

## Future Enhancements

### Planned Features
- Local LLM integration for workflow generation
- Visual workflow editor in web app
- Batch operations for multiple workflows
- Workflow templates and sharing
- Advanced canvas manipulation (drag & drop)
- Workflow version control
- Real-time collaboration
- Workflow import/export
- Node library browser
- Workflow testing tools

### API Enhancements
- Webhook management
- Execution history viewing
- Credential management
- Environment variable handling
- Workflow scheduling

## Development Guidelines

### Adding New Features

1. **Web App:**
   - Create component in `src/components/`
   - Add service methods to `N8nApiClient.js`
   - Update App.jsx to integrate component
   - Add styles to component CSS file

2. **Chrome Extension:**
   - Update content script for new DOM interactions
   - Add message handlers in background script
   - Update popup UI for new actions
   - Test in isolated environment first

### Testing

**Web App Testing:**
```bash
cd web-app
npm run dev          # Start dev server
npm run build        # Test production build
npm run preview      # Preview production build
```

**Extension Testing:**
```bash
cd chrome-extension
npm run dev          # Watch mode for development
npm run build        # Production build
# Then load unpacked extension in Chrome
```

## API Reference

### N8nApiClient

#### Constructor
```javascript
new N8nApiClient(baseUrl: string, apiKey: string)
```

#### Methods

**getWorkflows(): Promise<Array<Workflow>>**
Returns array of all workflows.

**createWorkflow(workflow: WorkflowData): Promise<Workflow>**
Creates a new workflow.

**updateWorkflow(id: string, workflow: WorkflowData): Promise<Workflow>**
Updates an existing workflow.

**addNodeToWorkflow(workflowId: string, node: NodeData): Promise<Workflow>**
Adds a node to a workflow.

### Content Script Messages

#### readCanvas
Reads current canvas state.

**Request:**
```javascript
{ action: 'readCanvas' }
```

**Response:**
```javascript
{
  success: true,
  data: { nodes: [...], connections: [...] }
}
```

#### injectNode
Injects a new node into canvas.

**Request:**
```javascript
{
  action: 'injectNode',
  nodeData: { name: 'Node', type: 'type' }
}
```

#### pushToAPI
Pushes workflow changes to API.

**Request:**
```javascript
{
  action: 'pushToAPI',
  workflowData: { ... }
}
```

## Troubleshooting

### Common Issues

**API Connection Errors:**
- Verify n8n instance URL is correct
- Check API key is valid
- Ensure n8n API is enabled
- Check network connectivity
- Look for CORS issues

**Canvas Reading Not Working:**
- Verify on n8n workflow page
- Check browser console for errors
- Ensure extension has permissions
- Try refreshing the page

**Build Errors:**
- Delete node_modules and reinstall
- Clear build cache
- Check Node.js version (18+)
- Verify all dependencies installed

---

For more information, see the main [README.md](../README.md) and [Chrome Extension Installation Guide](chrome-extension/INSTALLATION.md).
