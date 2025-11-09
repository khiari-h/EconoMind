import Textarea from '@/ui/Textarea'
import Button from '@/ui/Button'
import PropTypes from 'prop-types';

function ChatInput({ value, onChange, onKeyPress, onSend, loading, agent }) {
  const focusRing = agent === 'professor' ? 'focus:ring-professor' : 'focus:ring-coach'
  return (
    <div>
      <div className="flex gap-3">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={agent === 'professor' ? 'Ask the professor a question...' : 'Tell me what you want to practice...'}
          className={`min-h-[48px] ${focusRing}`}
          rows={2}
          disabled={loading}
        />
        <Button onClick={onSend} disabled={loading || !value.trim()} variant={agent}>
          Send
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
    </div>
  )
}

ChatInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  agent: PropTypes.oneOf(['professor', 'coach']).isRequired,
};

export default ChatInput;
