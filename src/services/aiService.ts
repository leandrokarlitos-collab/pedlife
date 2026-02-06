// AI Service for external AI agent integration
export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  message: string;
  success: boolean;
  error?: string;
}

// Tipos de provedor suportados
type AIProvider = 'pedro' | 'gemini' | 'vertex' | 'openai' | 'anthropic' | 'ollama';

import { medicamentos } from '../medications';

export class AIService {
  private static readonly API_URL = import.meta.env.VITE_AI_API_URL || 'https://pedro-production.up.railway.app/ask';
  private static readonly API_KEY = import.meta.env.VITE_AI_API_KEY || 'pedroapikey';
  private static readonly MODEL = import.meta.env.VITE_AI_MODEL || 'pedro-v1';
  private static readonly PROVIDER: AIProvider = (import.meta.env.VITE_AI_PROVIDER as AIProvider) || 'pedro';

  // Vertex AI specific configs
  private static readonly VERTEX_PROJECT = import.meta.env.VITE_VERTEX_PROJECT || '';
  private static readonly VERTEX_LOCATION = import.meta.env.VITE_VERTEX_LOCATION || 'us-central1';

  // System prompt para contexto médico pediátrico (usado por provedores genéricos)
  private static readonly SYSTEM_PROMPT = `Você é o PedLife Assistant, um assistente clínico pediátrico, mas aja como um colega médico experiente em uma discussão rápida de corredor.

DIRETRIZES CRÍTICAS:
1. SEJA EXTREMAMENTE CONCISO E DIRETO. Evite introduções longas ou rodeios.
2. Responda como uma conversa natural ("Olha, a dose é X...", "O protocolo sugere Y...").
3. NÃO faça listas longas a menos que explicitamente solicitado.
4. Para cálculos de dose, dê o valor final direto, mas SEMPRE adicione o aviso: "Confira na calculadora oficial".
5. Se o usuário perguntar de um medicamento, dê a dose habitual e sugira abrir a calculadora.
6. Responda em Português (BR).

Exemplo de tom: "Para Amoxicilina, a dose usual é 50mg/kg/dia. Dividido em 3 tomadas."`;


  /**
   * Detecta o provedor baseado na URL da API ou configuração explícita
   */
  private static detectProvider(): AIProvider {
    // 1. Verificação explícita da variável de ambiente (Prioridade Absoluta)
    if (this.PROVIDER && this.PROVIDER !== 'pedro') {
      return this.PROVIDER;
    }

    // 2. Detecção baseada na URL (Legado/Fallback)
    const url = this.API_URL.toLowerCase();
    if (url.includes('aiplatform.googleapis.com') || url.includes('vertex')) return 'vertex';
    if (url.includes('generativelanguage.googleapis.com')) return 'gemini';
    if (url.includes('api.openai.com')) return 'openai';
    if (url.includes('api.anthropic.com')) return 'anthropic';
    if (url.includes('localhost:11434') || url.includes('ollama')) return 'ollama';

    // 3. Padrão antigo
    return 'pedro';
  }

  /**
   * Recupera contexto da plataforma (RAG-lite) baseado no texto do usuário
   */
  private static retrieveContext(text: string): string {
    const hits = medicamentos.filter(med =>
      text.toLowerCase().includes(med.data.nome.toLowerCase()) ||
      (med.data.nomesComerciais && med.data.nomesComerciais.some(n => text.toLowerCase().includes(n.toLowerCase())))
    );

    if (hits.length === 0) return '';

    let context = '\n\n[CONTEXTO DA PLATAFORMA - PRIORIDADE MÁXIMA]\n';
    context += 'ATENÇÃO IA: O usuário mencionou medicamentos que constam em nossa base de dados. Você DEVE seguir estritamente as restrições abaixo:\n\n';

    hits.forEach(med => {
      const d = med.data;
      context += `--- MEDICAMENTO: ${d.nome} ---\n`;
      if (d.restricaoIdade) {
        context += `RESTRIÇÃO DE IDADE/PESO: ${d.restricaoIdade.idadeMinima || ''} ${d.restricaoIdade.pesoMinimo || ''} (${d.restricaoIdade.observacao || ''})\n`;
        context += `REGRA CRÍTICA: Se o paciente tiver idade/peso abaixo do limite, DÊ O ALERTA E NÃO RECOMENDE A DOSE.\n`;
      }
      if (d.alertas && d.alertas.length > 0) {
        context += `ALERTAS DE SEGURANÇA: ${d.alertas.join('; ')}\n`;
      }
      if (d.doseUsualTexto) {
        context += `DOSE PADRÃO DA PLATAFORMA: ${d.doseUsualTexto}\n`;
      }
      context += `-----------------------------------\n`;
    });

    return context;
  }

  /**
   * Send message to external AI agent
   */
  static async sendMessage(
    userMessage: string,
    conversationHistory: AIMessage[] = []
  ): Promise<AIResponse> {
    try {
      // Check if API key is configured
      if (!this.API_KEY || this.API_KEY === 'pedroapikey') {
        const provider = this.detectProvider();
        if (provider !== 'pedro' && this.API_KEY === 'pedroapikey') {
          // ... existing checks ...
          return {
            message: `Erro de configuração: Chave da API não definida para o provedor ${provider}.`,
            success: false,
            error: 'API key not configured for selected provider'
          };
        }
        if (!this.API_KEY) {
          // ... existing checks ...
          return {
            message: 'Desculpe, o serviço de IA não está configurado...',
            success: false,
            error: 'API key not configured'
          };
        }
      }

      // RAG-lite: Inject Context
      const platformContext = this.retrieveContext(userMessage);
      const startPrompt = conversationHistory.length === 0 ? this.SYSTEM_PROMPT : '';

      // Se tiver contexto, acoplamos ao userMessage para garantir que a IA veja "agora"
      const finalUserMessage = platformContext
        ? `${userMessage}\n${platformContext}`
        : userMessage;

      const provider = this.detectProvider();

      switch (provider) {
        case 'vertex':
          return await this.sendVertexMessage(finalUserMessage, conversationHistory);
        case 'gemini':
          return await this.sendGeminiMessage(finalUserMessage, conversationHistory);
        case 'openai':
          return await this.sendOpenAIMessage(finalUserMessage, conversationHistory);
        case 'anthropic':
          return await this.sendAnthropicMessage(finalUserMessage, conversationHistory);
        case 'ollama':
          return await this.sendOllamaMessage(finalUserMessage, conversationHistory);
        default:
          return await this.sendPedroMessage(finalUserMessage);
      }

    } catch (error) {
      // ... existing error handling ...
      console.error('AI Service Error:', error);
      return {
        message: this.getFallbackResponse(userMessage),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Send message to Google Gemini API
   */
  private static async sendGeminiMessage(
    userMessage: string,
    conversationHistory: AIMessage[] = []
  ): Promise<AIResponse> {
    // Sanitizar a API Key (remover espaços e aspas)
    const apiKey = this.API_KEY.trim().replace(/^["']|["']$/g, '');

    // Usar modelo configurado ou fallback seguro atualizado
    const model = this.MODEL || 'gemini-1.5-flash';

    // Tentar v1beta primeiro, mas permitir fallback para v1 se necessário
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    // Converter histórico para formato Gemini
    const contents = [];

    // Adicionar system prompt como primeira mensagem do usuário (Gemini não tem role system nativo)
    contents.push({
      role: 'user',
      parts: [{ text: this.SYSTEM_PROMPT }]
    });
    contents.push({
      role: 'model',
      parts: [{ text: 'Entendido! Sou o PedLife Assistant, pronto para ajudar com questões de pediatria.' }]
    });

    // Adicionar histórico de conversa
    for (const msg of conversationHistory) {
      if (msg.role === 'system') continue; // Gemini não suporta role system
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      });
    }

    // Adicionar mensagem atual
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error Detail:', errorData);
      throw new Error(`Gemini API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return {
        message: data.candidates[0].content.parts[0].text.trim(),
        success: true
      };
    }

    if (data.promptFeedback?.blockReason) {
      return {
        message: 'Desculpe, não posso responder a essa pergunta devido às políticas de segurança.',
        success: false,
        error: `Blocked: ${data.promptFeedback.blockReason}`
      };
    }

    throw new Error('Formato de resposta inesperado da API do Gemini');
  }

  /**
   * Send message to Google Cloud Vertex AI
   * Requer autenticação via Access Token (OAuth2) ou API Key
   */
  private static async sendVertexMessage(
    userMessage: string,
    conversationHistory: AIMessage[] = []
  ): Promise<AIResponse> {
    const project = this.VERTEX_PROJECT;
    const location = this.VERTEX_LOCATION;
    const model = this.MODEL || 'gemini-1.5-flash';

    if (!project) {
      throw new Error('VITE_VERTEX_PROJECT não configurado. Configure o ID do projeto do Google Cloud.');
    }

    // URL do Vertex AI
    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:generateContent`;

    // Converter histórico para formato Vertex AI (igual ao Gemini)
    const contents = [];

    // Adicionar system instruction (Vertex AI suporta systemInstruction)
    const systemInstruction = {
      parts: [{ text: this.SYSTEM_PROMPT }]
    };

    // Adicionar histórico de conversa
    for (const msg of conversationHistory) {
      if (msg.role === 'system') continue;
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      });
    }

    // Adicionar mensagem atual
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.API_KEY}` // Access Token do Google Cloud
      },
      body: JSON.stringify({
        contents,
        systemInstruction,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || errorData.error?.status || 'Unknown error';
      throw new Error(`Vertex AI Error: ${response.status} - ${errorMessage}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return {
        message: data.candidates[0].content.parts[0].text.trim(),
        success: true
      };
    }

    if (data.promptFeedback?.blockReason) {
      return {
        message: 'Desculpe, não posso responder a essa pergunta devido às políticas de segurança.',
        success: false,
        error: `Blocked: ${data.promptFeedback.blockReason}`
      };
    }

    throw new Error('Formato de resposta inesperado da API do Vertex AI');
  }

  /**
   * Send message to OpenAI API
   */
  private static async sendOpenAIMessage(
    userMessage: string,
    conversationHistory: AIMessage[] = []
  ): Promise<AIResponse> {
    const messages = [
      { role: 'system', content: this.SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    const url = this.PROVIDER === 'openai' && this.API_URL.includes('up.railway.app')
      ? 'https://api.openai.com/v1/chat/completions'
      : this.API_URL;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.API_KEY}`
      },
      body: JSON.stringify({
        model: this.MODEL || 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      message: data.choices[0].message.content.trim(),
      success: true
    };
  }

  /**
   * Send message to Anthropic Claude API
   */
  private static async sendAnthropicMessage(
    userMessage: string,
    conversationHistory: AIMessage[] = []
  ): Promise<AIResponse> {
    const messages = conversationHistory
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role,
        content: m.content
      }));

    messages.push({ role: 'user', content: userMessage });

    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.MODEL || 'claude-3-sonnet-20240229',
        max_tokens: 2048,
        system: this.SYSTEM_PROMPT,
        messages
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      message: data.content[0].text.trim(),
      success: true
    };
  }

  /**
   * Send message to Ollama (local LLM)
   */
  private static async sendOllamaMessage(
    userMessage: string,
    conversationHistory: AIMessage[] = []
  ): Promise<AIResponse> {
    const messages = [
      { role: 'system', content: this.SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.MODEL || 'llama2',
        messages,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      message: data.message.content.trim(),
      success: true
    };
  }

  /**
   * Send message to Pedro API (original implementation)
   */
  private static async sendPedroMessage(userMessage: string): Promise<AIResponse> {
    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.API_KEY
      },
      body: JSON.stringify({
        message: userMessage
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.response) {
      return {
        message: data.response.trim(),
        success: true
      };
    } else if (data.detail) {
      const errorMsg = Array.isArray(data.detail)
        ? data.detail.map((d: { msg: string }) => d.msg).join(', ')
        : data.detail;
      throw new Error(`Pedro API Error: ${errorMsg}`);
    } else {
      throw new Error('Formato de resposta inesperado da API do Pedro');
    }
  }

  /**
   * Fallback responses when external AI is not available
   */
  private static getFallbackResponse(userMessage: string): string {
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage.includes('dose') || lowercaseMessage.includes('dosagem')) {
      return 'Para cálculos de dosagem, use nossa calculadora de medicamentos. Informe o peso e idade do paciente para obter as doses corretas. (Modo offline - configure a API de IA para respostas mais precisas)';
    }

    if (lowercaseMessage.includes('emergência') || lowercaseMessage.includes('urgência')) {
      return 'Em situações de emergência, consulte nossos protocolos de atendimento. Temos protocolos para anafilaxia, parada cardiorrespiratória, convulsões e muito mais. (Modo offline - configure a API de IA para respostas mais precisas)';
    }

    if (lowercaseMessage.includes('protocolo')) {
      return 'Nossos protocolos incluem: Anafilaxia, Asma, TCE, Celulite, Convulsões, e muitos outros. Navegue pela seção de protocolos para mais informações. (Modo offline - configure a API de IA para respostas mais precisas)';
    }

    if (lowercaseMessage.includes('insulin') || lowercaseMessage.includes('diabetes')) {
      return 'Para cálculos de insulina, use nossa calculadora específica. Ela considera o peso, glicemia e outros fatores importantes. (Modo offline - configure a API de IA para respostas mais precisas)';
    }

    if (lowercaseMessage.includes('obrigado') || lowercaseMessage.includes('valeu')) {
      return 'De nada! Estou aqui para ajudar sempre que precisar. Boa prática clínica! 👨‍⚕️';
    }

    return 'Entendo sua pergunta. Para melhor atendê-lo, recomendo explorar nossas calculadoras de medicamentos e protocolos clínicos. (Modo offline - configure a API de IA para respostas mais precisas)';
  }

  /**
   * Test connection to AI service
   */
  static async testConnection(): Promise<boolean> {
    try {
      // Ao invés de uma string genérica, enviamos um "Ping" ou "Olá"
      // Usar a mesma lógica de roteamento do sendMessage para respeitar o provider
      const response = await this.sendMessage('Olá, teste de conexão');

      // Verificação mais robusta: se retornou sucesso E uma mensagem não vazia
      return response.success && !!response.message;
    } catch (error) {
      console.error("Erro no teste de conexão IA:", error);
      return false;
    }
  }
}

