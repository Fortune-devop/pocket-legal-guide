
import React, { useState } from 'react';
import { Send, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import LegalHeader from '@/components/LegalHeader';
import LegalFooter from '@/components/LegalFooter';
import ChatMessage from '@/components/ChatMessage';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: "Hello! I'm your Pocket Legal Assistant. I can help answer general legal questions. What would you like to know about?",
    isUser: false,
    timestamp: new Date()
  }
];

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Generate a mock response
      let response = "I'm sorry, but I can only provide general information, not specific legal advice. ";
      
      if (input.toLowerCase().includes('divorce')) {
        response += "Divorce laws vary by jurisdiction, but generally involve property division, potential spousal support, and if applicable, child custody arrangements. It's advisable to consult with a family law attorney for guidance specific to your situation.";
      } else if (input.toLowerCase().includes('evict') || input.toLowerCase().includes('tenant')) {
        response += "Landlord-tenant laws protect both parties. Proper notice must be given before eviction, typically 30-60 days depending on your location and circumstances. Consult local housing laws or a tenant rights organization for specific requirements in your area.";
      } else if (input.toLowerCase().includes('contract')) {
        response += "For a contract to be legally valid, it typically requires an offer, acceptance, consideration (something of value exchanged), legal purpose, and capable parties. Written contracts are generally easier to enforce than verbal agreements.";
      } else {
        response += "For specific legal advice tailored to your situation, I'd recommend consulting with a qualified attorney who practices in the relevant area of law.";
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LegalHeader />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-legal-primary">Legal AI Assistant</h1>
          
          <Card className="border-legal-border mb-4">
            <ScrollArea className="h-[60vh] p-4">
              {messages.map(message => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <Loader className="h-6 w-6 animate-spin text-legal-primary" />
                </div>
              )}
            </ScrollArea>
          </Card>
          
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your legal question..."
              disabled={isLoading}
              className="flex-grow"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-legal-primary hover:bg-legal-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p className="italic">
              Note: This AI assistant provides general legal information only, not legal advice.
              For specific legal advice, please consult with a qualified attorney.
            </p>
          </div>
        </div>
      </main>
      
      <LegalFooter />
    </div>
  );
};

export default ChatPage;

