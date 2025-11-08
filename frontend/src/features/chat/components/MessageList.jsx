import ChatMessage from './ChatMessage'

function MessageList({ messages, agent, endRef }) {
  return (
    <div className={`bg-white border-x-2 ${agent === 'professor' ? 'border-professor' : 'border-coach'} min-h-[400px] max-h-[500px] overflow-y-auto p-6`}>
      {messages.map((m, i) => (
        <ChatMessage key={i} role={m.role} agent={agent}>{m.content}</ChatMessage>
      ))}
      <div ref={endRef} />
    </div>
  )
}

export default MessageList
