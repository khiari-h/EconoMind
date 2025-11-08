import ChatWindow from '@/features/chat/components/ChatWindow'
import { useChat } from '@/features/chat/hooks/useChat'

function Coach({ course }) {
  const initial = {
    role: 'agent',
    content: course
      ? `Hey there! I'm your economics coach. Ready to practice "${course.title}" with some exercises? Let's get started!`
      : "Hey! I'm your economics coach. Let's practice with exercises, case studies, and practical applications. What topic do you want to work on?",
  }
  const { messages, input, setInput, loading, send, onKeyPress } = useChat({ agent: 'coach', course, initialMessage: initial })

  const header = (
    <div className="p-4 bg-white border-b border-stone-200 shadow-sm">
      <div className="text-center">
        <div className="text-4xl mb-2">💪</div>
        <h1 className="text-2xl font-bold text-coach-dark">
          The Coach
        </h1>
        <p className="text-sm text-stone-500">{course ? `Training on: ${course.title}` : 'Practice makes perfect!'}</p>
      </div>
    </div>
  )

  return (
    <ChatWindow
      agent="coach"
      header={header}
      course={course}
      messages={messages}
      loading={loading}
      input={input}
      setInput={setInput}
      onKeyPress={onKeyPress}
      onSend={send}
    />
  )
}

export default Coach
