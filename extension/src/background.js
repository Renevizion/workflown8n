// Background service worker for the extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('n8n Workflow Manipulator Extension Installed');
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CANVAS_STATE') {
    // Store canvas state
    chrome.storage.local.set({ canvasState: request.data });
    sendResponse({ success: true });
  } else if (request.type === 'INJECT_NODES') {
    // Forward to content script to inject nodes
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'INJECT_NODES',
          nodes: request.nodes
        });
      }
    });
    sendResponse({ success: true });
  } else if (request.type === 'EXECUTE_N8N_API') {
    // Execute n8n API call
    executeN8nApi(request.config, request.method, request.endpoint, request.data)
      .then(result => sendResponse({ success: true, data: result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep channel open for async response
  }
});

async function executeN8nApi(config, method, endpoint, data) {
  const url = `${config.n8nUrl}${endpoint}`;
  const options = {
    method,
    headers: {
      'X-N8N-API-KEY': config.n8nApiKey,
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return await response.json();
}
