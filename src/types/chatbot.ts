export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  needsUserInfo?: boolean;
}

export interface ChatbotDesign {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  fontSize?: string;
  fontFamily?: string;
  buttonSize?: string;
  chatHeight?: string;
  chatWidth?: string;
}

export interface ChatbotConfig {
  selector?: string;
  token?: string;
  baseUrl: string;
  theme?: 'light' | 'dark';
  position?: 'bottom-right' | 'bottom-left';
  welcomeMessage?: string;
  design?: ChatbotDesign;
}

export interface ChatResponse {
  success: boolean;
  data: {
    reply: string;
    token: string;
    conversationId: string;
    messageCount: number;
    isNewConversation: boolean;
    needsUserInfo: boolean;
  };
}

export interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  data?: {
    leadId: string;
    conversationId: string;
    name?: string;
    email?: string;
    phone?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ChatRequest {
  message: string;
  token?: string;
}