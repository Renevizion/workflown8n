import React, { useState } from 'react';
import './PromptInput.css';

function PromptInput({ onSubmit, loading, disabled }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !loading) {
      onSubmit(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="prompt-input">
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your workflow in natural language... e.g., 'Create a workflow that sends a Slack message when a new email arrives'"
          disabled={disabled || loading}
          rows={4}
        />
        <button 
          type="submit" 
          disabled={disabled || loading || !prompt.trim()}
        >
          {loading ? 'Processing...' : 'Generate Workflow'}
        </button>
      </form>
      {disabled && (
        <p className="hint">Please configure n8n and LLM settings first</p>
      )}
    </div>
  );
}

export default PromptInput;
