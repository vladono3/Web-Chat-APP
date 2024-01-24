import React, { useState, useEffect } from "react";
import { API_SELF, MESSAGES_ENDPOINT, USER_ID, WEBOSCKETS } from "../constants/constants";

import { ChatMessage } from "./chat-app-message";
import { ChatInput } from "./chat-input";
import { useLogin } from "./login-provider";
import { Button } from "@mantine/core";

export async function fetchMessages(id) {
  const response = await window.fetch(`${API_SELF}${MESSAGES_ENDPOINT}?user_id=${USER_ID}&discussion_id=${id}`)
  const data = await response.json()
  return data
}

export function ChatMessages({ discussion, selectDiscussion }) {
  const [messages, setMessages] = useState([]);
  const { isLoggedIn, login, logout } = useLogin();
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    async function loadMessages() {
      if (discussion) {
        const data = await fetchMessages(discussion);
        setMessages(data);
      }
    }

    loadMessages();

    const ws = new WebSocket(`${WEBOSCKETS}/${USER_ID}`);
    setWebSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [messages]);

  useEffect(() => {
    const handleWebSocketMessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    if (webSocket) {
      webSocket.addEventListener("message", handleWebSocketMessage);
    }
    return () => {
      if (webSocket) {
        webSocket.removeEventListener("message", handleWebSocketMessage);
      }
    };
  }, [webSocket]);

  return (
    <div>
      {isLoggedIn ? (
        discussion ? (
          <div className="w-auto">
            <div className="mb-4 flex h-[70vh] flex-col border-2 border-navbar-color overflow-auto p-5">
              {messages.map((message) => (
                <div
                  className={`mb-10 w-1/2 ${message.user_id === USER_ID ? 'self-end' : 'self-start'}`}
                  key={message.id}
                >
                  <ChatMessage
                    value={message.value}
                    userName={message.name}
                    isMe={message.user_id === USER_ID}
                    key={message.user_id}
                  />
                  
                </div>
              ))}
            </div>
            <ChatInput
              discussion={discussion}
              selectDiscussion={selectDiscussion}
              webSocket={webSocket}
            />
          </div>
        ) : (
          <div className="h-[90vh] w-full grid place-items-center">
            <h1>Please select a discussion:</h1>
          </div>
        )
      ) : (
        <div className="h-[90vh] w-full grid place-items-center">
          <h1>Please Log In if you want to use the Chat APP</h1>
        </div>
      )}
    </div>
  );
}

