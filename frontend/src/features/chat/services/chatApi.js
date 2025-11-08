import apiClient from '@/services/apiClient'

export async function sendAgentMessage(agent, payload) {
  const res = await apiClient(`/api/chat/${agent}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res
}
