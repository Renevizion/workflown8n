import React, { useState, useEffect } from 'react';
import './App.css';
import N8nApiClient from './services/N8nApiClient';
import WorkflowManager from './components/WorkflowManager';
import ApiKeySetup from './components/ApiKeySetup';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [apiClient, setApiClient] = useState(null);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('n8n_api_key');
    const storedApiUrl = localStorage.getItem('n8n_api_url');
    
    if (storedApiKey && storedApiUrl) {
      setApiKey(storedApiKey);
      setApiUrl(storedApiUrl);
      setApiClient(new N8nApiClient(storedApiUrl, storedApiKey));
      setIsConfigured(true);
    }
  }, []);

  const handleSaveConfig = (newApiKey, newApiUrl) => {
    localStorage.setItem('n8n_api_key', newApiKey);
    localStorage.setItem('n8n_api_url', newApiUrl);
    setApiKey(newApiKey);
    setApiUrl(newApiUrl);
    setApiClient(new N8nApiClient(newApiUrl, newApiKey));
    setIsConfigured(true);
  };

  const handleReset = () => {
    localStorage.removeItem('n8n_api_key');
    localStorage.removeItem('n8n_api_url');
    setApiKey('');
    setApiUrl('');
    setApiClient(null);
    setIsConfigured(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔄 n8n Interface Manipulator</h1>
        <p>Active interface manipulator with Direct API Access & DOM Injection</p>
      </header>

      {!isConfigured ? (
        <ApiKeySetup onSave={handleSaveConfig} />
      ) : (
        <WorkflowManager apiClient={apiClient} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
