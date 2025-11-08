import { useState, useRef, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

function Professor({ course }) {
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      content: course 
        ? `Hello! I'm your economics professor. I see you're interested in "${course.title}". What would you like to learn about?`
        : "Hello! I'm your economics professor. Ask me anything about economic concepts, and I'll explain them clearly with examples."
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/chat/professor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          course_context: course ? `${course.title}: ${course.content}` : null
        })
      })

      const data = await response.json()
      
      // Add agent response
      setMessages(prev => [...prev, { 
        role: 'agent', 
        content: data.response 
      }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'agent', 
        content: "Sorry, I'm having trouble connecting. Please try again." 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-professor-light rounded-t-2xl p-6 border-2 border-professor">
        <div className="flex items-center gap-4">
          <div className="text-5xl">🎓</div>
          <div>
            <h1 className="text-3xl font-bold text-professor-dark">
              The Professor
            </h1>
            <p className="text-gray-600">
              {course ? `Teaching: ${course.title}` : 'Ask me about economics'}
            </p>
          </div>
        </div>
      </div>

      {/* Course Context (if available) */}
      {course && (
        <div className="bg-blue-50 p-4 border-x-2 border-professor">
          <details className="cursor-pointer">
            <summary className="font-semibold text-professor-dark">
              📚 Course Material: {course.title}
            </summary>
            <div className="mt-3 text-sm text-gray-700 whitespace-pre-line">
              {course.content}
            </div>
          </details>
        </div>
      )}

      {/* Chat Messages */}
      <div className="bg-white border-x-2 border-professor min-h-[400px] max-h-[500px] overflow-y-auto p-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.role}`}
          >
            {msg.role === 'agent' && (
              <div className="flex items-start gap-2">
                <span className="text-2xl">🎓</span>
                <div className="flex-1 whitespace-pre-line">{msg.content}</div>
              </div>
            )}
            {msg.role === 'user' && (
              <div className="whitespace-pre-line">{msg.content}</div>
            )}
          </div>
        ))}
        
        {loading && (
          <div className="chat-bubble agent">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-professor rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-professor rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-professor rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-b-2xl p-4 border-2 border-t-0 border-professor">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask the professor a question..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-professor resize-none"
            rows="2"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-professor text-white px-6 py-3 rounded-lg font-semibold hover:bg-professor-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}

export default Professor
