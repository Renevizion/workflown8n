// Content script for DOM manipulation and canvas reading
(function() {
  'use strict';

  // Detect n8n canvas
  function isN8nPage() {
    return window.location.hostname.includes('n8n') || 
           document.querySelector('.n8n-canvas') !== null ||
           document.querySelector('[class*="canvas"]') !== null;
  }

  // Extract canvas state from n8n editor
  function extractCanvasState() {
    try {
      // Try to find n8n's workflow data in the page
      const workflowData = {
        nodes: [],
        connections: {},
        detected: false
      };

      // Look for canvas elements
      const canvasElements = document.querySelectorAll('[data-node-name], .node, [class*="node"]');
      
      canvasElements.forEach((el, index) => {
        const nodeName = el.getAttribute('data-node-name') || 
                        el.textContent.trim().split('\n')[0] || 
                        `Node ${index + 1}`;
        
        const rect = el.getBoundingClientRect();
        
        workflowData.nodes.push({
          name: nodeName,
          position: [rect.left, rect.top],
          element: el.className
        });
      });

      workflowData.detected = workflowData.nodes.length > 0;

      return workflowData;
    } catch (error) {
      console.error('Failed to extract canvas state:', error);
      return { nodes: [], connections: {}, detected: false };
    }
  }

  // Inject nodes into canvas
  function injectNodes(nodes) {
    if (!isN8nPage()) {
      console.warn('Not on an n8n page, cannot inject nodes');
      return;
    }

    // This is a simplified injection - in reality, you'd need to:
    // 1. Use n8n's API to update the workflow
    // 2. Trigger a canvas refresh
    // 3. Or directly manipulate n8n's internal state if accessible

    console.log('Injecting nodes:', nodes);
    
    // Send notification that nodes were injected
    const event = new CustomEvent('n8n-nodes-injected', { 
      detail: { nodes } 
    });
    document.dispatchEvent(event);
  }

  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'INJECT_NODES') {
      injectNodes(request.nodes);
      sendResponse({ success: true });
    } else if (request.type === 'GET_CANVAS_STATE') {
      const state = extractCanvasState();
      sendResponse({ success: true, data: state });
    }
    return true;
  });

  // Initialize
  if (isN8nPage()) {
    console.log('n8n Workflow Manipulator: Detected n8n page');
    
    // Auto-extract canvas state periodically
    setInterval(() => {
      const state = extractCanvasState();
      if (state.detected) {
        chrome.runtime.sendMessage({
          type: 'CANVAS_STATE',
          data: state
        });
      }
    }, 5000); // Every 5 seconds
  }

})();
