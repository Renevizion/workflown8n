import React, { useState, useEffect } from 'react';
import './popup.css';

function Popup() {
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('https://');
  const [isConfigured, setIsConfigured] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['n8n_api_key', 'n8n_api_url'], (result) => {
      if (result.n8n_api_key && result.n8n_api_url) {
        setApiKey(result.n8n_api_key);
        setApiUrl(result.n8n_api_url);
        setIsConfigured(true);
      }
    });
  }, []);

  const handleSave = () => {
    if (!apiKey.trim() || !apiUrl.trim()) {
      setStatus('Please fill in all fields');
      return;
    }

    chrome.storage.local.set(
      {
        n8n_api_key: apiKey,
        n8n_api_url: apiUrl
      },
      () => {
        setIsConfigured(true);
        setStatus('Configuration saved!');
        setTimeout(() => setStatus(''), 2000);
      }
    );
  };

  const handleReset = () => {
    chrome.storage.local.remove(['n8n_api_key', 'n8n_api_url'], () => {
      setApiKey('');
      setApiUrl('https://');
      setIsConfigured(false);
      setStatus('Configuration reset');
      setTimeout(() => setStatus(''), 2000);
    });
  };

  const handleInjectCanvas = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'readCanvas' },
        (response) => {
          if (response && response.success) {
            setStatus('Canvas state captured!');
          } else {
            setStatus('Failed to read canvas');
          }
          setTimeout(() => setStatus(''), 2000);
        }
      );
    });
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <h1>🔄 n8n Manipulator</h1>
        <p>DOM Injection & API Access</p>
      </div>

      {status && (
        <div className={`status ${status.includes('Failed') ? 'error' : 'success'}`}>
          {status}
        </div>
      )}

      {!isConfigured ? (
        <div className="config-section">
          <h2>Setup</h2>
          <div className="form-group">
            <label>n8n Instance URL:</label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://your-n8n.com"
            />
          </div>
          <div className="form-group">
            <label>API Key:</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key"
            />
          </div>
          <button onClick={handleSave} className="btn btn-primary">
            Save Configuration
          </button>
        </div>
      ) : (
        <div className="actions-section">
          <h2>Actions</h2>
          <div className="info-box">
            <p><strong>✓</strong> Extension configured</p>
            <p><strong>Instance:</strong> {apiUrl}</p>
          </div>
          
          <button onClick={handleInjectCanvas} className="btn btn-primary">
            Read Canvas State
          </button>
          
          <div className="feature-list">
            <h3>Features:</h3>
            <ul>
              <li>DOM injection enabled</li>
              <li>Real-time canvas reading</li>
              <li>Direct API access</li>
              <li>Node manipulation</li>
            </ul>
          </div>

          <button onClick={handleReset} className="btn btn-secondary">
            Reset Configuration
          </button>
        </div>
      )}
    </div>
  );
}

export default Popup;
