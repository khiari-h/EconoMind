function ChatMessage({ role, children, agent }) {
  const isAgent = role === 'agent'
  const agentIcon = agent === 'professor' ? '🎓' : '💪'
  return (
    <div className={`chat-bubble ${role}`}>
      {isAgent ? (
        <div className="flex items-start gap-2">
          <span className="text-2xl">{agentIcon}</span>
          <div className="flex-1 whitespace-pre-line">{children}</div>
        </div>
      ) : (
        <div className="whitespace-pre-line">{children}</div>
      )}
    </div>
  )
}

export default ChatMessage
