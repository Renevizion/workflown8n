import React, { useState, useEffect } from 'react';

function WorkflowManager({ apiClient, onReset }) {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiClient.getWorkflows();
      setWorkflows(data);
    } catch (err) {
      setError(`Failed to load workflows: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkflow = async () => {
    try {
      setError('');
      setSuccess('');
      const newWorkflow = await apiClient.createWorkflow({
        name: `New Workflow ${new Date().toLocaleString()}`,
        nodes: [],
        connections: {},
        active: false
      });
      setSuccess('Workflow created successfully!');
      loadWorkflows();
    } catch (err) {
      setError(`Failed to create workflow: ${err.message}`);
    }
  };

  return (
    <div className="workflow-container">
      <div className="workflow-header">
        <h2>📊 Workflow Manager</h2>
        <button onClick={onReset} className="btn btn-secondary">
          Reset Configuration
        </button>
      </div>

      <div className="info-section">
        <h3>Features</h3>
        <ul>
          <li><strong>Direct API Access:</strong> Manage workflows programmatically</li>
          <li><strong>Real-time Updates:</strong> Create and update workflows instantly</li>
          <li><strong>DOM Injection:</strong> Use the Chrome extension for canvas manipulation</li>
          <li>Install the Chrome extension to enable DOM injection and canvas reading</li>
        </ul>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <button onClick={handleCreateWorkflow} className="btn btn-primary">
        Create New Workflow
      </button>

      {loading ? (
        <div className="loading">Loading workflows...</div>
      ) : (
        <div className="workflow-list">
          <h3>Your Workflows ({workflows.length})</h3>
          {workflows.length === 0 ? (
            <p style={{ color: '#666', marginTop: '20px' }}>
              No workflows found. Create your first workflow!
            </p>
          ) : (
            workflows.map((workflow) => (
              <div key={workflow.id} className="workflow-item">
                <h3>{workflow.name}</h3>
                <p><strong>ID:</strong> {workflow.id}</p>
                <p><strong>Status:</strong> {workflow.active ? '✅ Active' : '⏸️ Inactive'}</p>
                <p><strong>Nodes:</strong> {workflow.nodes?.length || 0}</p>
                <p><strong>Updated:</strong> {new Date(workflow.updatedAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default WorkflowManager;
