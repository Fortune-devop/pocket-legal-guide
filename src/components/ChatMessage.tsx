
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className={cn(
        "h-8 w-8",
        isUser ? "bg-legal-accent text-white" : "bg-legal-primary text-white"
      )}>
        <AvatarFallback>
          {isUser ? "U" : "AI"}
        </AvatarFallback>
        {!isUser && (
          <AvatarImage src="/assets/ai-avatar.png" alt="AI Assistant" />
        )}
      </Avatar>
      <div className={cn(
        "rounded-lg px-4 py-2 max-w-[80%]",
        isUser ? "bg-legal-accent/90 text-white" : "bg-legal-primary/10"
      )}>
        <p className="text-sm">{message}</p>
        <div className={cn(
          "text-xs mt-1",
          isUser ? "text-white/70" : "text-muted-foreground"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
