import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCollaborateChat } from '../features/chat/hooks/useCollaborateChat';

function Collaborate({ course, navigate, viewedCourses }) {
  const { messages, input, setInput, loading, send, onKeyPress } = useCollaborateChat({ course, viewedCourses });

  const getAgentIcon = (role) => {
    if (role === 'professor') return '🎓';
    if (role === 'coach') return '💪';
    if (role === 'system') return '🤖';
    return '👤';
  };

  const getAgentName = (role) => {
    if (role === 'professor') return 'Professor';
    if (role === 'coach') return 'Coach';
    if (role === 'system') return 'System';
    return 'You';
  };

  return (
    <div className="flex flex-col h-screen bg-stone-100">
      <header className="bg-white border-b border-stone-200 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-800">🧠 Collaborative Session</h1>
          {course ? (
            <p className="text-slate-600">
              Topic: <span className="font-semibold text-blue-600">{course.title}</span>
            </p>
          ) : (
            <p className="text-slate-500">
              Please{' '}
              <button onClick={() => navigate('courses')} className="text-blue-600 hover:underline">
                select a course
              </button>{' '}
              to begin.
            </p>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((m) => (
            <div key={m.id} className={`flex items-start gap-4 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role !== 'user' && (
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xl flex-shrink-0">
                  {getAgentIcon(m.role)}
                </div>
              )}
              <div
                className={`max-w-2xl p-4 rounded-2xl ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white shadow-sm'
                }`}
              >
                <div className="font-bold mb-2 text-sm">{getAgentName(m.role)}</div>
                <div className="prose prose-lg max-w-none prose-p:my-2">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xl flex-shrink-0">
                🤖
              </div>
              <div className="max-w-2xl p-4 rounded-2xl bg-white shadow-sm">
                <div className="font-bold mb-2 text-sm">Agents are thinking...</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-lg border-t border-stone-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center bg-white border border-stone-300 rounded-lg shadow-sm px-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyPress} 
              placeholder={course ? 'Ask a question to start the collaboration...' : 'Please select a course first.'}
              className="flex-1 p-3 bg-transparent focus:outline-none resize-none text-slate-800"
              rows="1"
              disabled={!course || loading}
            />
            <button onClick={send} disabled={!course || loading} className="p-3 text-blue-600 disabled:text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 28.125 28.125 0 0 0 21.42-10.425a.75.75 0 0 0 0-.83A28.125 28.125 0 0 0 3.478 2.404Z" /></svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

Collaborate.propTypes = {
  course: PropTypes.object,
  navigate: PropTypes.func.isRequired,
  viewedCourses: PropTypes.array,
};

export default Collaborate;