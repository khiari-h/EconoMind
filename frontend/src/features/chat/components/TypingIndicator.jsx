function TypingIndicator({ agent }) {
  const color = agent === 'professor' ? 'bg-professor' : 'bg-coach'
  const icon = agent === 'professor' ? '🎓' : '💪'
  return (
    <div className="chat-bubble agent">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <div className="flex gap-1">
          <div className={`w-2 h-2 ${color} rounded-full animate-bounce`}></div>
          <div className={`w-2 h-2 ${color} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
          <div className={`w-2 h-2 ${color} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
