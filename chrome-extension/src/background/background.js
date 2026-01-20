// Background service worker for the n8n Interface Manipulator extension
console.log('n8n Interface Manipulator: Background service worker started');

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed/updated:', details.reason);
  
  if (details.reason === 'install') {
    // Set default configuration
    chrome.storage.local.set({
      extensionEnabled: true
    });
    
    console.log('Extension installed successfully');
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);

  if (request.action === 'getConfig') {
    // Return stored configuration
    chrome.storage.local.get(['n8n_api_key', 'n8n_api_url'], (result) => {
      sendResponse(result);
    });
    return true; // Keep channel open for async response
  } else if (request.action === 'apiRequest') {
    // Proxy API requests from content scripts
    makeApiRequest(request.endpoint, request.options)
      .then(sendResponse)
      .catch(error => {
        sendResponse({
          success: false,
          error: error.message
        });
      });
    return true;
  }

  return false;
});

// Function to make API requests to n8n
async function makeApiRequest(endpoint, options = {}) {
  try {
    // Get API configuration
    const config = await chrome.storage.local.get(['n8n_api_key', 'n8n_api_url']);
    
    if (!config.n8n_api_key || !config.n8n_api_url) {
      throw new Error('API configuration not set');
    }

    const url = `${config.n8n_api_url}/api/v1${endpoint}`;
    const headers = {
      'X-N8N-API-KEY': config.n8n_api_key,
      'Content-Type': 'application/json',
      ...options.headers
    };

    console.log('Making API request to:', url);

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Monitor tab updates to inject content script when needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('Tab updated:', tab.url);
    
    // Check if this might be an n8n instance
    if (tab.url.includes('n8n')) {
      console.log('Detected potential n8n instance');
    }
  }
});

// Keep service worker alive
chrome.alarms.create('keepAlive', { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'keepAlive') {
    console.log('Background service worker keepalive');
  }
});

console.log('n8n Interface Manipulator: Background service worker ready');
