import axios from 'axios';

class N8nApiClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'X-N8N-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  async getWorkflows() {
    const response = await this.client.get('/workflows');
    return response.data.data;
  }

  async getWorkflow(id) {
    const response = await this.client.get(`/workflows/${id}`);
    return response.data;
  }

  async createWorkflow(workflow) {
    const response = await this.client.post('/workflows', workflow);
    return response.data;
  }

  async updateWorkflow(id, workflow) {
    const response = await this.client.put(`/workflows/${id}`, workflow);
    return response.data;
  }

  async activateWorkflow(id) {
    const response = await this.client.patch(`/workflows/${id}`, { active: true });
    return response.data;
  }

  async deactivateWorkflow(id) {
    const response = await this.client.patch(`/workflows/${id}`, { active: false });
    return response.data;
  }

  async executeWorkflow(id, data) {
    const response = await this.client.post(`/workflows/${id}/execute`, { data });
    return response.data;
  }
}

export default N8nApiClient;
