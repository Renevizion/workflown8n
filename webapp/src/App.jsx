import React, { useState, useEffect } from 'react';
import N8nApiClient from './services/n8nApi';
import LLMProcessor from './services/llmProcessor';
import ConfigPanel from './components/ConfigPanel';
import PromptInput from './components/PromptInput';
import WorkflowViewer from './components/WorkflowViewer';
import './App.css';

function App() {
  const [config, setConfig] = useState({
    n8nUrl: localStorage.getItem('n8nUrl') || '',
    n8nApiKey: localStorage.getItem('n8nApiKey') || '',
    llmProvider: localStorage.getItem('llmProvider') || 'openai',
    llmApiKey: localStorage.getItem('llmApiKey') || '',
  });

  const [n8nClient, setN8nClient] = useState(null);
  const [llmProcessor, setLLMProcessor] = useState(null);
  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (config.n8nUrl && config.n8nApiKey) {
      setN8nClient(new N8nApiClient(config.n8nUrl, config.n8nApiKey));
    }
    if (config.llmProvider && config.llmApiKey) {
      setLLMProcessor(new LLMProcessor(config.llmProvider, config.llmApiKey));
    }
  }, [config]);

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
    Object.entries(newConfig).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  };

  const handlePromptSubmit = async (prompt) => {
    if (!llmProcessor || !n8nClient) {
      setError('Please configure n8n and LLM settings first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Process prompt with LLM
      const workflowJson = await llmProcessor.processPrompt(prompt, workflow);
      
      // Create or update workflow in n8n
      let result;
      if (workflow && workflow.id) {
        result = await n8nClient.updateWorkflow(workflow.id, workflowJson);
      } else {
        result = await n8nClient.createWorkflow(workflowJson);
      }
      
      setWorkflow(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkflowLoad = async (workflowId) => {
    if (!n8nClient) return;
    
    setLoading(true);
    try {
      const wf = await n8nClient.getWorkflow(workflowId);
      setWorkflow(wf);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>n8n Workflow Manipulator</h1>
        <p>Direct API access with LLM-powered workflow generation</p>
      </header>

      <ConfigPanel config={config} onChange={handleConfigChange} />

      <div className="main-content">
        <PromptInput 
          onSubmit={handlePromptSubmit} 
          loading={loading}
          disabled={!n8nClient || !llmProcessor}
        />

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {workflow && (
          <WorkflowViewer 
            workflow={workflow}
            onLoad={handleWorkflowLoad}
            n8nClient={n8nClient}
          />
        )}
      </div>
    </div>
  );
}

export default App;
