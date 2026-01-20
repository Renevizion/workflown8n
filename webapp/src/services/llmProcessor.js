import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

class LLMProcessor {
  constructor(provider, apiKey) {
    this.provider = provider;
    this.apiKey = apiKey;
    
    // SECURITY WARNING: Using dangerouslyAllowBrowser exposes API keys in the client.
    // This is suitable for personal use only. For production, implement a backend proxy.
    // See SECURITY.md for recommendations.
    if (provider === 'openai') {
      this.client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    } else if (provider === 'anthropic') {
      this.client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
    }
  }

  async processPrompt(prompt, existingWorkflow = null) {
    const systemPrompt = `You are an expert n8n workflow generator. Convert natural language descriptions into valid n8n workflow JSON.
    
Key requirements:
1. Generate minimal, efficient node structures
2. Use only necessary nodes - avoid unnecessary subnodes unless specifically required
3. Ensure all node versions are compatible with n8n 2026 API
4. Follow n8n JSON schema strictly
5. Keep workflows simple and performant

Node structure template:
{
  "name": "Workflow Name",
  "nodes": [
    {
      "parameters": {},
      "id": "unique-id",
      "name": "Node Name",
      "type": "n8n-nodes-base.nodeName",
      "typeVersion": 2.1,
      "position": [x, y]
    }
  ],
  "connections": {},
  "active": false,
  "settings": {}
}

${existingWorkflow ? `Existing workflow to modify: ${JSON.stringify(existingWorkflow)}` : ''}

Respond ONLY with valid JSON, no explanations.`;

    if (this.provider === 'openai') {
      return await this.processWithOpenAI(prompt, systemPrompt);
    } else if (this.provider === 'anthropic') {
      return await this.processWithAnthropic(prompt, systemPrompt);
    }
  }

  async processWithOpenAI(prompt, systemPrompt) {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  async processWithAnthropic(prompt, systemPrompt) {
    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      temperature: 0.1,
      system: systemPrompt,
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    const content = response.content[0].text;
    // Extract JSON from potential markdown code blocks
    const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/```\n?([\s\S]*?)\n?```/);
    const jsonText = jsonMatch ? jsonMatch[1] : content;
    return JSON.parse(jsonText);
  }
}

export default LLMProcessor;
