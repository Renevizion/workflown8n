class N8nApiClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.apiKey = apiKey;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}/api/v1${endpoint}`;
    const headers = {
      'X-N8N-API-KEY': this.apiKey,
      'Content-Type': 'application/json',
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to connect to n8n API: ${error.message}`);
    }
  }

  async getWorkflows() {
    const response = await this.request('/workflows');
    return response.data || [];
  }

  async getWorkflow(id) {
    return await this.request(`/workflows/${id}`);
  }

  async createWorkflow(workflow) {
    return await this.request('/workflows', {
      method: 'POST',
      body: JSON.stringify(workflow)
    });
  }

  async updateWorkflow(id, workflow) {
    return await this.request(`/workflows/${id}`, {
      method: 'PUT',
      body: JSON.stringify(workflow)
    });
  }

  async deleteWorkflow(id) {
    return await this.request(`/workflows/${id}`, {
      method: 'DELETE'
    });
  }

  async activateWorkflow(id) {
    return await this.request(`/workflows/${id}/activate`, {
      method: 'POST'
    });
  }

  async deactivateWorkflow(id) {
    return await this.request(`/workflows/${id}/deactivate`, {
      method: 'POST'
    });
  }

  async addNodeToWorkflow(workflowId, node) {
    const workflow = await this.getWorkflow(workflowId);
    workflow.nodes = workflow.nodes || [];
    workflow.nodes.push(node);
    return await this.updateWorkflow(workflowId, workflow);
  }
}

export default N8nApiClient;
