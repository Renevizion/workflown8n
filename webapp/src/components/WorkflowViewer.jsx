import React from 'react';
import './WorkflowViewer.css';

function WorkflowViewer({ workflow, onLoad, n8nClient }) {
  const handleActivate = async () => {
    try {
      await n8nClient.activateWorkflow(workflow.id);
      onLoad(workflow.id);
    } catch (err) {
      alert('Failed to activate workflow: ' + err.message);
    }
  };

  const handleDeactivate = async () => {
    try {
      await n8nClient.deactivateWorkflow(workflow.id);
      onLoad(workflow.id);
    } catch (err) {
      alert('Failed to deactivate workflow: ' + err.message);
    }
  };

  return (
    <div className="workflow-viewer">
      <div className="workflow-header">
        <h2>{workflow.name}</h2>
        <div className="workflow-actions">
          {workflow.active ? (
            <button onClick={handleDeactivate} className="btn-deactivate">
              Deactivate
            </button>
          ) : (
            <button onClick={handleActivate} className="btn-activate">
              Activate
            </button>
          )}
          <span className={`status ${workflow.active ? 'active' : 'inactive'}`}>
            {workflow.active ? '● Active' : '○ Inactive'}
          </span>
        </div>
      </div>

      <div className="workflow-info">
        <p><strong>ID:</strong> {workflow.id}</p>
        <p><strong>Nodes:</strong> {workflow.nodes?.length || 0}</p>
        <p><strong>Updated:</strong> {new Date(workflow.updatedAt).toLocaleString()}</p>
      </div>

      <div className="workflow-nodes">
        <h3>Nodes</h3>
        <div className="nodes-grid">
          {workflow.nodes?.map((node, index) => (
            <div key={index} className="node-card">
              <div className="node-type">{node.type?.split('.').pop()}</div>
              <div className="node-name">{node.name}</div>
              <div className="node-version">v{node.typeVersion}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="workflow-json">
        <h3>Workflow JSON</h3>
        <pre>{JSON.stringify(workflow, null, 2)}</pre>
      </div>
    </div>
  );
}

export default WorkflowViewer;
