import { useState } from "react"
import { API } from "../constants/constants"
import { useEffect } from "react"
import { ChatMessage } from "./chat-app-message"
import { ChatInput } from "./chat-input"
import { useLogin } from "./login-provider"
import { Button } from "@mantine/core"

const discussionId = '921772a4-b673-479f-8586-b2bffd3348b3'
const userId = '19b22709-8dcc-4a7c-ba65-e6eeecfa5162'

const API_EX = `https://chat-app-dualusv.azurewebsites.net/api/discussions/${discussionId}/messages?user_id=${userId}`

async function fetchMessages() {
  const response = await window.fetch(API_EX)
  const data = await response.json()
  return data
}

export function ChatMessages() {
  const [messages, setMessages] = useState([])
  const { isLoggedIn, login, logout } = useLogin();

  async function loadMessages() {
    const data = await fetchMessages()
    setMessages(data)
  }
  useEffect(() => {
    loadMessages()
  }, [])

  return (
    <div>
      {isLoggedIn ? <div className="w-auto">
      <div className="mb-4 flex h-[80vh] flex-col overflow-auto border-2 p-10">
        {messages.map((message) => (
          <div
            className={`mb-10 w-1/2 ${message.user_id === userId ? 'self-start' : 'self-end'}`}
            key={message.id}>
            <ChatMessage
              value={message.value}
              userName={message.name}
              isMe={message.user_id === userId}
            />
          </div>
        ))}
      </div>
      <ChatInput />
    </div> : <h1 className="flex items-center justify-center text-center">Log IN FIRST</h1>}
    </div>
  )
}
