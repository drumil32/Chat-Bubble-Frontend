export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatbotConfig {
  selector?: string;
  token: string;
  baseUrl: string;
  theme?: 'light' | 'dark';
  position?: 'bottom-right' | 'bottom-left';
  welcomeMessage?: string;
}

export interface ChatResponse {
  success: boolean;
  token: string;
  response: string;
}

export interface ChatRequest {
  message: string;
  token: string;
}