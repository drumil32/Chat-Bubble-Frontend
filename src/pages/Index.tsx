import React, { useEffect } from 'react';
import { createChatWidget } from '../chatbot';

const Index = () => {
  useEffect(() => {
    // Initialize chatbot widget with demo configuration
    const cleanup = createChatWidget({
      token: 'f6516db5-be0b-443d-a6bb-d1b3ad6babb9',
      baseUrl: 'http://localhost:3000', // Demo endpoint
      welcomeMessage: 'Welcome! This is a demo chatbot widget. Try sending a message!',
      position: 'bottom-right',
    });

    // Cleanup on unmount
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
            Embeddable Chat Widget
          </h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            A beautiful, lightweight chatbot widget that can be embedded into any website.
            Built with React, TypeScript, and Tailwind CSS for optimal performance.
          </p>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-elegant">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl mb-4 mx-auto"></div>
              <h3 className="font-semibold text-lg mb-2">Easy Integration</h3>
              <p className="text-muted-foreground">
                Simple script tag integration with just one line of JavaScript
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border shadow-elegant">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl mb-4 mx-auto"></div>
              <h3 className="font-semibold text-lg mb-2">Beautiful Design</h3>
              <p className="text-muted-foreground">
                Modern UI with smooth animations and gradient effects
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border shadow-elegant">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl mb-4 mx-auto"></div>
              <h3 className="font-semibold text-lg mb-2">Lightweight</h3>
              <p className="text-muted-foreground">
                Optimized bundle size with lazy loading and efficient rendering
              </p>
            </div>
          </div>

          {/* Usage Example */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-elegant text-left">
            <h3 className="text-2xl font-semibold mb-6 text-center">Usage Example</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-lg mb-2">1. Include the script</h4>
                <code className="block bg-muted p-4 rounded-lg text-sm">
                  {`<script src="https://your-domain.com/chatbot.js"></script>`}
                </code>
              </div>
              
              <div>
                <h4 className="font-medium text-lg mb-2">2. Initialize the widget</h4>
                <code className="block bg-muted p-4 rounded-lg text-sm whitespace-pre">
{`createChatWidget({
  selector: '#chat-container',
  token: 'f6516db5-be0b-443d-a6bb-d1b3ad6babb9',
  baseUrl: 'http://localhost:3000/api/chat',
  welcomeMessage: 'Hello! How can I help?'
});`}
                </code>
              </div>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="mt-12 p-6 bg-gradient-glow rounded-2xl border border-primary/20">
            <p className="text-lg font-medium text-primary">
              💬 Try the live demo! Click the chat bubble in the bottom-right corner
            </p>
            <p className="text-muted-foreground mt-2">
              This is a working example of the embeddable chatbot widget
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
