import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

/**
 * A custom hook to manage chat state and interactions with the backend API.
 * @param {{ agent: 'professor' | 'coach', course?: { id: string, title: string, content: string } }} param0
 * @returns
 */
export function useChat({ agent, course }) {
  /**
   * Generates the initial message based on the agent and selected course.
   * @returns {object} The initial message object.
   */
  const getInitialMessage = () => {
    const baseMessage = {
      id: uuidv4(),
      role: 'agent',
    };

    if (agent === 'professor') {
      return {
        ...baseMessage,
        content: course
          ? `Welcome! I'm your Professor. I see you've just reviewed the chapter on "${course.title}". What specific point would you like to clarify?`
          : "Welcome! I'm your economics Professor. Feel free to ask me about any economic concept.",
      };
    }

    if (agent === 'coach') {
      return {
        ...baseMessage,
        content: course
          ? `Welcome! I'm your Coach. Now that you've reviewed "${course.title}", let's put it into practice. What kind of exercise would you like to do? A case study, a dissertation, or a document analysis?`
          : "Welcome! I'm your economics Coach. Ready to train? Tell me what topic you'd like to work on.",
      };
    }
    return { ...baseMessage, content: 'Hello!' };
  };

  const [messages, setMessages] = useState([getInitialMessage()]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;

    const userMessage = { id: uuidv4(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat/${agent}`, {
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
      const agentMessage = { id: uuidv4(), role: 'agent', content: data.response };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = { id: uuidv4(), role: 'agent', content: "Sorry, an error occurred. Please try again." };
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