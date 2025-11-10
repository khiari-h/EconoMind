import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://economind-backend-847559264991.europe-west1.run.app';

/**
 * A custom hook for the collaborative chat session.
 * @param {{ course?: { id: string, title: string, content: string } }} param0
 * @returns
 */
export function useCollaborateChat({ course }) {
  const getInitialMessage = () => ({
    id: uuidv4(),
    role: 'system', // Use a 'system' role for the initial message
    content: course
      ? `Let's start a collaborative session on "${course.title}". Ask a question to get an explanation from the Professor, followed by an exercise from the Coach.`
      : "Welcome to the Collaborative Session! Select a course and ask a question to begin.",
  });

  const [messages, setMessages] = useState([getInitialMessage()]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || !course) return;

    const userMessage = { id: uuidv4(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat/collaborate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          course_context: course?.content || null,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Add TWO messages: one for the professor, one for the coach
      const professorMessage = { id: uuidv4(), role: 'professor', content: data.professor_response };
      const coachMessage = { id: uuidv4(), role: 'coach', content: data.coach_response };

      setMessages((prev) => [...prev, professorMessage, coachMessage]);

    } catch (error) {
      console.error('Failed to send message:', error); 
      const errorMessage = { id: uuidv4(), role: 'system', content: "Sorry, an error occurred. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return { messages, input, setInput, loading, send, onKeyPress };
}