# workflown8n

**Active Interface Manipulator for n8n** - A React web app and Chrome extension for programmatically manipulating n8n workflows with Direct API Access and DOM Injection.

## 🚀 Overview

This project provides two components:

1. **React Web App** - A web-based dashboard for managing n8n workflows via the Public API
2. **Chrome Extension** - A browser extension for DOM injection and real-time canvas manipulation

### Key Features

- **Direct API Access**: Programmatically create and update n8n workflows using the 2026 n8n Public API
- **DOM Injection**: Real-time canvas reading and node manipulation in the browser
- **Real-time Updates**: Push new nodes and workflow changes instantly
- **Secure Storage**: API keys stored locally in browser storage

## 📋 Requirements

- Node.js 18+ and npm
- n8n instance with API access enabled
- n8n Public API Key (get from your n8n instance settings)
- Chrome browser (for the extension)

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/Renevizion/workflown8n.git
cd workflown8n
npm install
```

### 2. Build Projects

```bash
# Build both web app and extension
npm run build

# Or build individually
npm run build:web        # Build web app only
npm run build:extension  # Build Chrome extension only
```

## 📱 React Web App

### Running the Web App

```bash
cd web-app
npm run dev
```

The app will start at `http://localhost:5173`

### Web App Features

- **API Configuration**: Enter your n8n instance URL and API key
- **Workflow Management**: View, create, and manage workflows
- **Direct API Access**: All operations use the n8n Public API
- **Persistent Storage**: Configuration saved in browser localStorage

### Usage

1. Open the web app in your browser
2. Enter your n8n instance URL (e.g., `https://your-n8n-instance.com`)
3. Enter your n8n API key
4. Click "Save Configuration"
5. View your workflows and create new ones

## 🔌 Chrome Extension

### Installing the Extension

1. Build the extension:
   ```bash
   npm run build:extension
   ```

2. Open Chrome and go to `chrome://extensions/`

3. Enable "Developer mode" (toggle in top-right corner)

4. Click "Load unpacked"

5. Select the `chrome-extension/dist` folder

### Extension Features

- **DOM Injection**: Reads current state of n8n canvas
- **Real-time Canvas Reading**: Detects nodes and workflow structure
- **API Integration**: Pushes changes via n8n API
- **Popup Interface**: Easy configuration and control

### Using the Extension

1. Click the extension icon in Chrome toolbar
2. Configure your n8n instance URL and API key
3. Navigate to your n8n instance
4. Click "Read Canvas State" to capture current workflow
5. The extension will inject code to read and manipulate the canvas

## 🔑 Getting Your n8n API Key

1. Log into your n8n instance
2. Go to Settings → API
3. Generate a new API key
4. Copy the key and paste it into the web app or extension

## 🏗️ Project Structure

```
workflown8n/
├── web-app/                  # React web application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ApiKeySetup.jsx
│   │   │   └── WorkflowManager.jsx
│   │   ├── services/         # API client
│   │   │   └── N8nApiClient.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── chrome-extension/         # Chrome extension
│   ├── src/
│   │   ├── popup/           # Extension popup UI
│   │   │   ├── Popup.jsx
│   │   │   ├── popup.jsx
│   │   │   ├── popup.css
│   │   │   └── index.html
│   │   ├── content/         # Content script (DOM injection)
│   │   │   └── content.js
│   │   └── background/      # Background service worker
│   │       └── background.js
│   ├── public/
│   │   └── manifest.json
│   ├── vite.config.js
│   └── package.json
│
├── package.json             # Root package.json (workspace)
└── README.md
```

## 🔧 Technical Details

### n8n API Integration

Both the web app and extension use the n8n Public API (2026 version) which supports:

- `GET /api/v1/workflows` - List all workflows
- `GET /api/v1/workflows/:id` - Get workflow details
- `POST /api/v1/workflows` - Create new workflow
- `PUT /api/v1/workflows/:id` - Update workflow
- `DELETE /api/v1/workflows/:id` - Delete workflow
- `POST /api/v1/workflows/:id/activate` - Activate workflow
- `POST /api/v1/workflows/:id/deactivate` - Deactivate workflow

### DOM Injection Mechanism

The Chrome extension's content script:

1. Injects into all web pages
2. Detects n8n canvas elements using selectors
3. Reads node positions and workflow structure
4. Observes DOM changes using MutationObserver
5. Communicates with background service worker
6. Pushes changes via n8n API

### Security

- API keys stored in browser storage (localStorage for web app, chrome.storage for extension)
- Never transmitted except to your configured n8n instance
- HTTPS recommended for all API communications
- No third-party services or data collection

## 🛡️ API Authentication

Both components use the `X-N8N-API-KEY` header for authentication:

```javascript
headers: {
  'X-N8N-API-KEY': 'your-api-key',
  'Content-Type': 'application/json'
}
```

## 🧪 Development

### Web App Development

```bash
cd web-app
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

### Extension Development

```bash
cd chrome-extension
npm run dev       # Build and watch for changes
npm run build     # Build for production
```

## 📝 Notes

- The extension requires permission to access all websites to detect n8n instances
- DOM injection works by reading the canvas structure and using the API to push changes
- In 2026, the n8n API fully supports programmatic workflow creation and updates
- Local LLM processing can be integrated for advanced workflow generation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Resources

- [n8n Documentation](https://docs.n8n.io/)
- [n8n API Documentation](https://docs.n8n.io/api/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [React Documentation](https://react.dev/)

## 💡 Future Enhancements

- Local LLM integration for intelligent workflow generation
- Visual workflow editor in the web app
- Batch operations for multiple workflows
- Workflow templates and sharing
- Advanced canvas manipulation features
- Workflow version control
- Real-time collaboration features

---

Built with ❤️ for the n8n community