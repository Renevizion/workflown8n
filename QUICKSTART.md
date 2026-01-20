# Quick Start Guide

## 1. Initial Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Get Your n8n API Key
1. Open your n8n instance (e.g., `https://your-n8n.com`)
2. Navigate to **Settings** → **API**
3. Click **Create API Key**
4. Copy the key immediately (you won't see it again!)
5. Save it securely

### Step 3: Get LLM API Key

#### Option A: OpenAI (Recommended)
1. Go to https://platform.openai.com/api-keys
2. Click **Create new secret key**
3. Name it (e.g., "n8n Workflow Tool")
4. Copy and save the key

#### Option B: Anthropic Claude
1. Go to https://console.anthropic.com/
2. Navigate to **API Keys**
3. Click **Create Key**
4. Copy and save the key

## 2. Running the Applications

### Web Application
```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build
npm run preview
```

Access at: `http://localhost:5173`

### Chrome Extension
```bash
# Build the extension
npm run build:extension

# Then load in Chrome:
# 1. Open chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the extension/dist folder
```

## 3. Configuration

### In Web App:
1. Click **⚙️ Configuration** at the top
2. Enter your **n8n Instance URL** (e.g., `https://your-n8n.com`)
3. Enter your **n8n API Key**
4. Select **LLM Provider** (OpenAI or Anthropic)
5. Enter your **LLM API Key**
6. Settings are saved automatically in browser

### In Chrome Extension:
1. Click the extension icon in Chrome
2. Scroll to **Configuration** section
3. Enter **n8n URL** and **API Key**
4. Click **💾 Save**

## 4. Creating Your First Workflow

### Example 1: Simple HTTP Request
```
Create a workflow that makes an HTTP GET request to https://api.github.com/users/octocat
and sends the result to a webhook
```

### Example 2: Email to Slack
```
Create a workflow that:
1. Triggers on new Gmail emails
2. Filters for emails with "urgent" in subject
3. Sends a Slack message with the email content
```

### Example 3: Data Processing
```
Create a workflow that:
1. Gets data from a Google Sheet
2. Filters rows where status is "pending"
3. Updates each row in a database via HTTP request
```

## 5. Using the Extension on n8n

1. **Navigate to your n8n instance** in Chrome
2. **Open a workflow** in the editor
3. **Click the extension icon**
4. **Click "📊 Read Canvas State"** to extract current workflow
5. Use the web app to modify or extend the workflow

## Tips for Best Results

### Writing Good Prompts
✅ **Good:**
- "Create a workflow with an HTTP Request node that GETs data from an API, then uses a Set node to extract the user field, and finally sends to a webhook"
- "Build a workflow that triggers every hour, fetches weather data, and emails me if temperature is below 0"

❌ **Avoid:**
- "Make a workflow" (too vague)
- "Do the thing with the API" (unclear)

### Performance Tips
- Keep workflows minimal - only add nodes you need
- Use specific node names in prompts
- Mention node versions if you know them
- Reference official n8n node names

### Common Node Types to Use
- **HTTP Request** - API calls
- **Webhook** - Trigger/receive data
- **Set** - Transform data
- **IF** - Conditional logic
- **Code** - JavaScript execution
- **Schedule Trigger** - Cron jobs
- **Email** - Send emails
- **Slack** - Slack integration

## 6. Troubleshooting

### "API Key Invalid"
- Regenerate your n8n API key
- Make sure you copied the entire key
- Check if your n8n instance requires specific permissions

### "Failed to Generate Workflow"
- Check your LLM API key is valid
- Ensure you have API credits (OpenAI/Anthropic)
- Try simplifying your prompt
- Check browser console for errors

### "Extension Not Working"
- Reload the extension page
- Check if you're on an actual n8n page
- Open browser console to see errors
- Try reloading the Chrome extension

### "Workflow Created but Not Visible"
- Refresh your n8n page
- Check the workflow list in n8n
- The workflow might be in "inactive" state

## 7. Advanced Usage

### Using Existing Workflow as Base
The LLM can modify existing workflows. The web app automatically passes the current workflow context when you have one loaded.

### Batch Operations
You can create multiple workflows by running the tool multiple times with different prompts.

### Version Control
Export your workflows from n8n and keep them in git for version control.

## 8. Security Best Practices

⚠️ **Important:**
- Never share your API keys
- Use environment variables for keys in production
- Regularly rotate your API keys
- Use HTTPS for all n8n connections
- Review generated workflows before activating them
- Don't commit `.env` files to git

## Need Help?

- 📖 Check the main [README.md](README.md)
- 🐛 Report issues on GitHub
- 💬 Join n8n community forums
- 📧 Contact support

## Next Steps

1. ✅ Complete configuration
2. ✅ Test with a simple workflow
3. ✅ Try the Chrome extension on your n8n instance
4. ✅ Explore more complex workflows
5. ✅ Share your feedback!

Happy automating! 🚀
