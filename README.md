# n8n Workflow Manipulator

An active interface manipulator for n8n with LLM-powered workflow generation. This project includes both a React web application and a Chrome extension for real-time workflow manipulation.

## ⚠️ Security Notice

**This tool is designed for personal use in trusted environments.** API keys are stored in the browser and transmitted directly to services. Before using in production or on shared devices, please review [SECURITY.md](SECURITY.md) for important security considerations and best practices.

For production use, implement a backend proxy to securely handle API keys. See the security documentation for details.

## Features

### 🚀 Core Capabilities
- **Direct n8n API Access**: Connect using your n8n Public API Key
- **LLM-Powered Generation**: Use OpenAI GPT-4 or Anthropic Claude to convert natural language to n8n workflows
- **Real-time Manipulation**: Chrome extension for DOM injection and canvas state reading
- **Minimal & Efficient**: Generates clean workflows with only necessary nodes
- **Schema Compatibility**: Ensures node version compatibility with your n8n instance

### 📦 Components

#### React Web App
- Configuration interface for n8n and LLM settings
- Natural language prompt input
- Workflow visualization and management
- Real-time workflow creation and updates

#### Chrome Extension
- Detects n8n pages automatically
- Reads canvas state from n8n editor
- Injects nodes into workflows
- Quick access popup for common actions

## Installation

### Prerequisites
- Node.js 18+ and npm
- n8n instance with API access (Community Edition or licensed self-hosted)
- OpenAI API key OR Anthropic API key

### Web App Setup

1. Clone the repository:
```bash
git clone https://github.com/Renevizion/workflown8n.git
cd workflown8n
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Chrome Extension Setup

1. Build the extension:
```bash
npm run build:extension
```

2. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `extension/dist` folder

## Configuration

### n8n Setup

1. **Get your n8n API Key**:
   - Open your n8n instance
   - Go to Settings → API
   - Generate a new API key
   - Copy the key (you won't be able to see it again)

2. **Configure in Web App**:
   - Click "⚙️ Configuration"
   - Enter your n8n instance URL (e.g., `https://your-n8n.com`)
   - Enter your n8n API key
   - Settings are saved to localStorage

### LLM Configuration

Choose one of the following providers:

#### OpenAI (GPT-4)
1. Get API key from https://platform.openai.com/api-keys
2. Select "OpenAI" in the LLM Provider dropdown
3. Enter your OpenAI API key

#### Anthropic (Claude)
1. Get API key from https://console.anthropic.com/
2. Select "Anthropic (Claude)" in the LLM Provider dropdown
3. Enter your Anthropic API key

## Usage

### Web App

1. **Configure Settings**:
   - Expand the Configuration panel
   - Enter n8n URL and API key
   - Select LLM provider and enter API key

2. **Generate Workflow**:
   - Type a natural language description in the prompt box
   - Example: "Create a workflow that sends a Slack message when a new email arrives"
   - Click "Generate Workflow"

3. **View & Manage**:
   - View generated workflow JSON
   - See all nodes and connections
   - Activate/deactivate workflows
   - View workflow details

### Chrome Extension

1. **Open Extension**:
   - Navigate to your n8n instance
   - Click the extension icon

2. **Quick Actions**:
   - **Read Canvas State**: Extracts current workflow from the n8n editor
   - **Open Web App**: Opens the full web application

3. **Configuration**:
   - Enter n8n URL and API key in the popup
   - Settings sync between extension and web app

## API Reference

### n8n API Endpoints Used

- `GET /workflows` - List all workflows
- `GET /workflows/:id` - Get workflow details
- `POST /workflows` - Create new workflow
- `PUT /workflows/:id` - Update workflow
- `PATCH /workflows/:id` - Activate/deactivate workflow
- `POST /workflows/:id/execute` - Execute workflow

### LLM Integration

The system uses structured prompts to ensure:
- Minimal node generation
- Schema version compatibility
- Efficient workflow structure
- Proper connections between nodes

## Troubleshooting

### Common Issues

#### "API request failed"
- Verify your n8n instance is accessible
- Check that your API key is valid
- Ensure you're using a self-hosted or Community Edition (not trial)

#### "Schema version mismatch"
- Update your n8n instance to the latest version
- The LLM will generate nodes compatible with n8n 2026 API

#### "Community node not found"
- Install required community nodes in n8n Settings → Community Nodes
- Use only built-in nodes in your prompts

#### Extension doesn't detect n8n page
- Ensure you're on an n8n editor page
- Refresh the page after loading the extension
- Check browser console for errors

## Development

### Project Structure
```
workflown8n/
├── webapp/              # React web application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API clients and LLM processor
│   │   ├── App.jsx      # Main application
│   │   └── main.jsx     # Entry point
│   └── index.html
├── extension/           # Chrome extension
│   ├── src/
│   │   ├── background.js   # Service worker
│   │   ├── content.js      # Content script
│   │   └── popup.js        # Popup logic
│   └── public/
│       ├── manifest.json
│       ├── popup.html
│       └── popup.css
├── package.json
└── vite.config.js
```

### Build Commands

```bash
# Development
npm run dev              # Start web app dev server

# Production
npm run build           # Build web app for production
npm run build:extension # Build Chrome extension

# Preview
npm run preview         # Preview production build
```

## Security Notes

⚠️ **Important Security Considerations**:

1. **API Keys**: Never commit API keys to version control
2. **Browser Storage**: Extension stores sensitive data in Chrome's local storage
3. **CORS**: Ensure your n8n instance allows requests from your domain
4. **HTTPS**: Always use HTTPS for n8n instances in production
5. **Key Rotation**: Regularly rotate your API keys

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC

## Support

For issues and questions:
- GitHub Issues: https://github.com/Renevizion/workflown8n/issues
- n8n Community: https://community.n8n.io/

## Acknowledgments

Built with:
- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [OpenAI](https://openai.com/) - GPT-4 API
- [Anthropic](https://www.anthropic.com/) - Claude API
- [n8n](https://n8n.io/) - Workflow automation platform