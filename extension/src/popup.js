// Popup script for Chrome extension
document.addEventListener('DOMContentLoaded', async () => {
  const readCanvasBtn = document.getElementById('read-canvas');
  const openWebappBtn = document.getElementById('open-webapp');
  const saveConfigBtn = document.getElementById('save-config');
  const executePromptBtn = document.getElementById('execute-prompt');
  const n8nUrlInput = document.getElementById('n8n-url');
  const apiKeyInput = document.getElementById('api-key');
  const promptInput = document.getElementById('prompt');
  const statusText = document.getElementById('status-text');
  const messageDiv = document.getElementById('message');

  // Load saved configuration
  const config = await chrome.storage.local.get(['n8nUrl', 'apiKey']);
  if (config.n8nUrl) n8nUrlInput.value = config.n8nUrl;
  if (config.apiKey) apiKeyInput.value = config.apiKey;

  function showMessage(text, type = 'success') {
    messageDiv.textContent = text;
    messageDiv.className = `message show ${type}`;
    setTimeout(() => {
      messageDiv.className = 'message';
    }, 3000);
  }

  function updateStatus(text) {
    statusText.textContent = text;
  }

  // Read canvas state
  readCanvasBtn.addEventListener('click', async () => {
    try {
      updateStatus('Reading canvas...');
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      const response = await chrome.tabs.sendMessage(tab.id, {
        type: 'GET_CANVAS_STATE'
      });

      if (response.success) {
        console.log('Canvas state:', response.data);
        showMessage(`Found ${response.data.nodes.length} nodes on canvas`, 'success');
        updateStatus('Canvas read successfully');
      } else {
        showMessage('Failed to read canvas', 'error');
        updateStatus('Ready');
      }
    } catch (error) {
      showMessage('Error: ' + error.message, 'error');
      updateStatus('Error');
    }
  });

  // Open web app
  openWebappBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('webapp/index.html') });
  });

  // Save configuration
  saveConfigBtn.addEventListener('click', async () => {
    const n8nUrl = n8nUrlInput.value.trim();
    const apiKey = apiKeyInput.value.trim();

    if (!n8nUrl || !apiKey) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    await chrome.storage.local.set({ n8nUrl, apiKey });
    showMessage('Configuration saved', 'success');
    updateStatus('Configured');
  });

  // Execute prompt
  executePromptBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    if (!prompt) {
      showMessage('Please enter a prompt', 'error');
      return;
    }

    const config = await chrome.storage.local.get(['n8nUrl', 'apiKey', 'llmProvider', 'llmApiKey']);
    if (!config.n8nUrl || !config.apiKey) {
      showMessage('Please configure n8n settings first', 'error');
      return;
    }

    try {
      updateStatus('Processing...');
      showMessage('This feature requires LLM configuration in the web app', 'error');
      updateStatus('Ready');
    } catch (error) {
      showMessage('Error: ' + error.message, 'error');
      updateStatus('Error');
    }
  });

  // Initial status check
  if (config.n8nUrl && config.apiKey) {
    updateStatus('Configured');
  }
});
