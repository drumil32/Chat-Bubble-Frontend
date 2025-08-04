# Embeddable Chatbot Widget

A lightweight, beautiful chatbot widget that can be embedded into any website with minimal setup.

## Features

- 🎨 **Beautiful Design**: Modern UI with gradient effects and smooth animations
- 🚀 **Lightweight**: Optimized bundle size with efficient rendering
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🔧 **Easy Integration**: Simple script tag integration
- 💬 **Real-time Chat**: Smooth message flow with typing indicators
- 🎭 **Customizable**: Configurable theme, position, and welcome message

## Quick Start

### 1. Include the Script

```html
<script src="https://your-domain.com/chatbot.js"></script>
```

### 2. Initialize the Widget

```javascript
createChatWidget({
  selector: 'body',                    // Target element (optional, defaults to 'body')
  token: 'YOUR_API_TOKEN',            // Required: Your API token
  baseUrl: 'https://your-api.com',    // Required: Your backend API URL
  welcomeMessage: 'Hello! How can I help?', // Optional welcome message
  theme: 'light',                     // Optional: 'light' or 'dark'
  position: 'bottom-right'            // Optional: 'bottom-right' or 'bottom-left'
});
```

## API Integration

The widget expects your backend to have an endpoint at `/api/chat` that accepts POST requests with this format:

### Request Format
```json
{
  "message": "User's message",
  "token": "session_token"
}
```

### Response Format
```json
{
  "success": true,
  "token": "updated_session_token",
  "response": "Bot's response message"
}
```

## Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `token` | string | Yes | - | API authentication token |
| `baseUrl` | string | Yes | - | Backend API base URL |
| `selector` | string | No | 'body' | CSS selector for target element |
| `welcomeMessage` | string | No | 'Hi! How can I help you today?' | Initial message shown to users |
| `theme` | string | No | 'light' | Theme variant ('light' or 'dark') |
| `position` | string | No | 'bottom-right' | Widget position on screen |

## Styling

The widget is fully self-contained with its own CSS. It uses a modern design with:

- Purple/blue gradient theme
- Glassmorphism effects
- Smooth animations and transitions
- Responsive design that works on all screen sizes

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Build for Production

To build the embeddable widget:

```bash
npm run build:widget
```

This creates an optimized bundle in the `dist-widget` directory that can be hosted and embedded anywhere.