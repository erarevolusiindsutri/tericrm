import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';

interface ChatDialogProps {
  chat: {
    id: number;
    type: string;
    message: string;
    aiResponse: string | null;
  };
  onClose: () => void;
}

export default function ChatDialog({ chat, onClose }: ChatDialogProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-black/95 border border-white/10 rounded-lg shadow-2xl z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <span className={`text-xs font-medium px-2 py-1 rounded ${
          chat.type === "Sales" ? "bg-blue-500/20 text-blue-200" : "bg-green-500/20 text-green-200"
        }`}>
          {chat.type}
        </span>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {/* User Message */}
        <div className="flex justify-start">
          <div className="bg-white/5 rounded-lg p-3 max-w-[80%]">
            <p className="text-sm text-white/90">{chat.message}</p>
            <span className="text-[10px] text-white/40 mt-1 block">2:30 PM</span>
          </div>
        </div>

        {/* AI Response */}
        <div className="flex justify-end">
          <div className="bg-blue-500/10 rounded-lg p-3 max-w-[80%]">
            <p className="text-sm text-blue-100">
              {chat.aiResponse || 'Processing your request...'}
            </p>
            <span className="text-[10px] text-blue-200/40 mt-1 block">2:31 PM</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/90 focus:outline-none focus:border-white/20"
          />
          <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
            <Send className="w-4 h-4 text-blue-200" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}