import { useState } from "react"
import { API } from "../constants/constants"
import { useEffect } from "react"
import { ChatMessage } from "./chat-app-message"
import { ChatInput } from "./chat-input"
import { useLogin } from "./login-provider"
import { Button } from "@mantine/core"
import { USER_ID } from "../constants/constants"


const discussionId = '921772a4-b673-479f-8586-b2bffd3348b3'

const API_EX = `https://chat-app-dualusv.azurewebsites.net/api/discussions/${discussionId}/messages?user_id=${USER_ID}`

async function fetchMessages() {
  const response = await window.fetch(API_EX)
  const data = await response.json()
  return data
}

export function ChatMessages() {
  const [messages, setMessages] = useState([])
  const { isLoggedIn, login, logout } = useLogin()

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
      <div className="mb-4 flex h-[70vh] flex-col overflow-auto border-2 p-10">
        {messages.map((message) => (
          <div
            className={`mb-10 w-1/2 ${message.user_id === USER_ID ? 'self-start' : 'self-end'}`}
            key={message.id}>
            <ChatMessage
              value={message.value}
              userName={message.name}
              isMe={message.user_id === USER_ID}
            />
          </div>
        ))}
      </div>
      <ChatInput />
    </div> : <div className="h-[90vh] w-full grid place-items-center">
            <h1>Please Log In if you want to use the Chat APP</h1>
          </div>}
    </div>
  )
}
