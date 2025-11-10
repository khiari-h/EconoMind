import ChatWindow from '@/features/chat/components/ChatWindow'
import { useChat } from '@/features/chat/hooks/useChat'
import PropTypes from 'prop-types';

function Coach({ course }) {
  const { messages, input, setInput, loading, send, onKeyPress } = useChat({ agent: 'coach', course })

  const header = (
    <div className="p-4 bg-white border-b border-stone-200 shadow-sm">
      <div className="text-center">
        <div className="text-4xl mb-2">💪</div>
        <h1 className="text-2xl font-bold text-coach-dark">
          The Coach
        </h1>
        <p className="text-sm text-stone-500">{course ? `Training on: ${course.title}` : 'Ready to train!'}</p>
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

Coach.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default Coach;
