// Content script for DOM injection and canvas manipulation
console.log('n8n Interface Manipulator: Content script loaded');

// Function to read n8n canvas state
function readCanvasState() {
  console.log('Reading n8n canvas state...');
  
  // Look for n8n canvas elements
  const canvasElements = {
    nodes: [],
    connections: [],
    viewport: {}
  };

  try {
    // Try to find n8n workflow canvas
    const workflowCanvas = document.querySelector('[data-test-id="canvas"]') || 
                          document.querySelector('.canvas-container') ||
                          document.querySelector('#canvas');

    if (workflowCanvas) {
      console.log('Found n8n canvas element');
      
      // Try to extract node information
      const nodeElements = workflowCanvas.querySelectorAll('[data-node-name]') ||
                          workflowCanvas.querySelectorAll('.node') ||
                          workflowCanvas.querySelectorAll('[class*="node"]');

      nodeElements.forEach((node, index) => {
        canvasElements.nodes.push({
          id: node.getAttribute('data-node-id') || `node-${index}`,
          name: node.getAttribute('data-node-name') || node.textContent?.trim() || `Node ${index}`,
          type: node.getAttribute('data-node-type') || 'unknown',
          position: {
            x: node.offsetLeft || 0,
            y: node.offsetTop || 0
          }
        });
      });

      console.log(`Found ${canvasElements.nodes.length} nodes`);
    } else {
      console.log('n8n canvas not found - may not be on n8n page');
    }

    // Try to read workflow data from window object if available
    if (window.__n8nWorkflow) {
      canvasElements.workflow = window.__n8nWorkflow;
    }

  } catch (error) {
    console.error('Error reading canvas state:', error);
  }

  return canvasElements;
}

// Function to inject a new node into the canvas
function injectNode(nodeData) {
  console.log('Injecting node into canvas:', nodeData);
  
  try {
    // This would use the n8n API to add the node
    // In a real implementation, this would interact with n8n's internal APIs
    console.log('Node injection prepared - will use API to push to workflow');
    
    return {
      success: true,
      message: 'Node prepared for injection via API'
    };
  } catch (error) {
    console.error('Error injecting node:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Function to push changes to n8n via API
async function pushToN8nAPI(workflowData) {
  try {
    // Get API configuration from storage
    const config = await chrome.storage.local.get(['n8n_api_key', 'n8n_api_url']);
    
    if (!config.n8n_api_key || !config.n8n_api_url) {
      throw new Error('API configuration not found');
    }

    console.log('Pushing changes to n8n API...');
    
    // This would make the actual API call
    // In 2026, the n8n API supports programmatic workflow updates
    const response = await fetch(`${config.n8n_api_url}/api/v1/workflows`, {
      method: 'POST',
      headers: {
        'X-N8N-API-KEY': config.n8n_api_key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workflowData)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Successfully pushed to n8n API:', result);
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Error pushing to n8n API:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Content script received message:', request);

  if (request.action === 'readCanvas') {
    const canvasState = readCanvasState();
    sendResponse({
      success: true,
      data: canvasState
    });
  } else if (request.action === 'injectNode') {
    const result = injectNode(request.nodeData);
    sendResponse(result);
  } else if (request.action === 'pushToAPI') {
    pushToN8nAPI(request.workflowData).then(sendResponse);
    return true; // Keep channel open for async response
  }

  return false;
});

// Observe DOM changes to detect when n8n canvas loads
const observer = new MutationObserver((mutations) => {
  // Check if n8n canvas appeared
  const canvas = document.querySelector('[data-test-id="canvas"]') || 
                 document.querySelector('.canvas-container');
  
  if (canvas) {
    console.log('n8n canvas detected!');
    // Could auto-initialize features here
  }
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('n8n Interface Manipulator: Ready for DOM injection');
