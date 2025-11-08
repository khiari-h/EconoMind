import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function Message({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
          <span className="text-lg">
            {message.agent === 'professor' ? '🎓' : '💪'}
          </span>
        </div>
      )}
      <div
        className={`max-w-lg px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-lg'
            : 'bg-white text-slate-800 border border-stone-200 rounded-bl-lg'
        }`}
      >
        <div className="prose prose-sm max-w-none text-inherit
                        prose-p:my-2
                        prose-headings:my-2
                        prose-strong:text-inherit
                        prose-a:text-inherit hover:prose-a:underline
                        prose-pre:bg-slate-700 prose-pre:text-white
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]} children={message.content} />
        </div>
      </div>
    </div>
  );
}

function TypingIndicator({ agent }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
        <span className="text-lg">{agent === 'professor' ? '🎓' : '💪'}</span>
      </div>
      <div className="bg-white text-slate-800 border border-stone-200 rounded-2xl rounded-bl-lg px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-stone-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-stone-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-stone-400 rounded-full animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}

function ChatWindow({ agent, header, messages, loading, input, setInput, onKeyPress, onSend }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="py-6 sm:py-8">
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-7rem)] bg-stone-100 rounded-2xl shadow-2xl shadow-stone-200 overflow-hidden">
        {header}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <Message key={index} message={{...msg, agent}} />
          ))}
          {loading && <TypingIndicator agent={agent} />}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-white border-t border-stone-200">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Type your message..."
              disabled={loading}
              className="w-full pl-4 pr-12 py-3 bg-stone-100 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={onSend}
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;