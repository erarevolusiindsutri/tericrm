import { motion, AnimatePresence } from 'framer-motion';
import { X, UserCog, Send } from 'lucide-react';
import { useState } from 'react';

interface ChatMessage {
  id: number;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  chat: {
    id: number;
    type: string;
    message: string;
    aiResponse: string | null;
  };
  onClose: () => void;
}

export default function ChatInterface({ chat, onClose }: ChatInterfaceProps) {
  const [userIntervention, setUserIntervention] = useState(false);
  const [message, setMessage] = useState('');
  
  const chatHistory: ChatMessage[] = [
    {
      id: 1,
      sender: 'user',
      message: chat.message,
      timestamp: '2:30 PM'
    },
    {
      id: 2,
      sender: 'ai',
      message: chat.aiResponse || 'Processing your request...',
      timestamp: '2:31 PM'
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Handle message sending logic here
    setMessage('');
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0, x: -20 }}
      animate={{ width: '35vw', opacity: 1, x: 0 }}
      exit={{ width: 0, opacity: 0, x: -20 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1
      }}
      className="bg-black/40 backdrop-blur-sm border-l border-white/10 h-[50vh] rounded-xl flex flex-col overflow-hidden"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 border-b border-white/10 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            chat.type === "Sales" ? "bg-blue-500/20 text-blue-200" : "bg-green-500/20 text-green-200"
          }`}>
            {chat.type}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>
      </motion.div>

      {/* Chat Messages */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-4"
      >
        {chatHistory.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (index * 0.1) }}
            className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'} items-end gap-2`}
          >
            <div className={`max-w-[80%] ${
              msg.sender === 'user' 
                ? 'bg-white/5 text-white/90' 
                : 'bg-blue-500/10 text-blue-100'
            } rounded-2xl px-4 py-2.5`}>
              <p className="text-sm leading-relaxed">{msg.message}</p>
              <span className={`text-[10px] mt-1 block ${
                msg.sender === 'user' ? 'text-white/40' : 'text-blue-200/40'
              }`}>{msg.timestamp}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Toggle and Input Area */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 border-t border-white/10 space-y-3"
      >
        <button
          onClick={() => setUserIntervention(!userIntervention)}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 ${
            userIntervention 
              ? 'bg-blue-500/20 text-blue-200' 
              : 'bg-white/5 text-white/40'
          }`}
        >
          <div className="flex items-center gap-2">
            <UserCog className="w-4 h-4" />
            <span className="text-sm">User Intervention</span>
          </div>
          <div className="w-8 h-4 rounded-full relative bg-white/10 transition-colors duration-200">
            <motion.div 
              initial={false}
              animate={{ 
                x: userIntervention ? 16 : 0,
                backgroundColor: userIntervention ? 'rgb(59, 130, 246)' : 'rgb(255, 255, 255, 0.2)'
              }}
              className="w-4 h-4 rounded-full absolute top-0 left-0 shadow-lg"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </button>

        <AnimatePresence mode="wait">
          {userIntervention && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white/90 focus:outline-none focus:border-white/20 placeholder:text-white/30"
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage}
                className="p-2 bg-blue-500/20 rounded-xl hover:bg-blue-500/30 transition-colors"
              >
                <Send className="w-4 h-4 text-blue-200" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}