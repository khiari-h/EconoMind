import ChatWindow from '@/features/chat/components/ChatWindow'
import { useChat } from '@/features/chat/hooks/useChat'
import PropTypes from 'prop-types';

function Professor({ course }) {
  const { messages, input, setInput, loading, send, onKeyPress } = useChat({ agent: 'professor', course })

  const header = (
    <div className="p-4 bg-white border-b border-stone-200 shadow-sm">
      <div className="text-center">
        <div className="text-4xl mb-2">🎓</div>
        <h1 className="text-2xl font-bold text-professor-dark">
          The Professor
        </h1>
        <p className="text-sm text-stone-500">{course ? `Teaching: ${course.title}` : 'Ask me about economics'}</p>
      </div>
    </div>
  )

  return (
    <ChatWindow
      agent="professor"
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

Professor.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default Professor;
