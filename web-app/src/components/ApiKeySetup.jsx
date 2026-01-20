import React, { useState } from 'react';

function ApiKeySetup({ onSave }) {
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('https://');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!apiKey.trim()) {
      setError('API Key is required');
      return;
    }

    if (!apiUrl.trim() || !apiUrl.startsWith('http')) {
      setError('Valid API URL is required (must start with http:// or https://)');
      return;
    }

    onSave(apiKey, apiUrl);
  };

  return (
    <div className="config-card">
      <h2>🔑 Configure n8n API Access</h2>
      
      <div className="info-section">
        <h3>Setup Instructions</h3>
        <ul>
          <li><strong>Direct API Access:</strong> Enter your n8n Public API Key below</li>
          <li>The 2026 n8n API supports programmatic workflow creation & updates</li>
          <li>Your API key is stored locally in your browser</li>
          <li>Get your API key from your n8n instance settings</li>
        </ul>
      </div>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="apiUrl">n8n Instance URL:</label>
          <input
            type="text"
            id="apiUrl"
            placeholder="https://your-n8n-instance.com"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="apiKey">API Key:</label>
          <input
            type="password"
            id="apiKey"
            placeholder="Enter your n8n API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Configuration
        </button>
      </form>
    </div>
  );
}

export default ApiKeySetup;
