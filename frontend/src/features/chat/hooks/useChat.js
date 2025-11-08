import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export function useChat({ agent, course, viewedCourses, initialMessage }) {
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat/${agent}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          // This is where the magic happens!
          // We send the full content of the current course as context.
          course_context: course ? course.content : null,
          // We also send the titles of previously viewed courses for revision context.
          viewed_courses_context: viewedCourses ? viewedCourses.map(c => c.title) : [],
        }),
      });

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();
      const agentMessage = { role: 'agent', content: data.response };
      setMessages(prev => [...prev, agentMessage]);

    } catch (error) {
      console.error(`Error chatting with ${agent}:`, error);
      const errorMessage = { role: 'agent', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) send();
  };

  return { messages, input, setInput, loading, send, onKeyPress };
}