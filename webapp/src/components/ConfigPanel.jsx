import React, { useState } from 'react';
import './ConfigPanel.css';

function ConfigPanel({ config, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="config-panel">
      <button 
        className="config-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        ⚙️ Configuration {isExpanded ? '▲' : '▼'}
      </button>

      {isExpanded && (
        <div className="config-content">
          <div className="config-section">
            <h3>n8n Configuration</h3>
            <div className="config-field">
              <label>n8n Instance URL</label>
              <input
                type="text"
                value={config.n8nUrl}
                onChange={(e) => handleChange('n8nUrl', e.target.value)}
                placeholder="https://your-n8n-instance.com"
              />
            </div>
            <div className="config-field">
              <label>n8n API Key</label>
              <input
                type="password"
                value={config.n8nApiKey}
                onChange={(e) => handleChange('n8nApiKey', e.target.value)}
                placeholder="Your n8n API key"
              />
            </div>
          </div>

          <div className="config-section">
            <h3>LLM Configuration</h3>
            <div className="config-field">
              <label>LLM Provider</label>
              <select
                value={config.llmProvider}
                onChange={(e) => handleChange('llmProvider', e.target.value)}
              >
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic (Claude)</option>
              </select>
            </div>
            <div className="config-field">
              <label>LLM API Key</label>
              <input
                type="password"
                value={config.llmApiKey}
                onChange={(e) => handleChange('llmApiKey', e.target.value)}
                placeholder={`Your ${config.llmProvider === 'openai' ? 'OpenAI' : 'Anthropic'} API key`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfigPanel;
