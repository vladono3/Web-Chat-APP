import React, { useState, useEffect, useRef } from "react";
import { API_SELF, MESSAGES_ENDPOINT, WEBSOSCKETS } from "../constants/constants";

import { ChatMessage } from "./chat-app-message";
import { ChatInput } from "./chat-input";
import { useLogin } from "./login-provider";
import { Button } from "@mantine/core";
import { AuthenticationForm } from "./chat-login";

async function fetchMessages(User, DISCUSSIONS_ID) {
  if(DISCUSSIONS_ID == '') return 'error'
  const API = `${API_SELF}${MESSAGES_ENDPOINT}/?user_id=${User}&discussion_id=${DISCUSSIONS_ID}`
  const response = await window.fetch(API)
  const data = await response.json()
  return data
}


export function ChatMessages({ messages, setMessages, discussion, selectDiscussion, User, setUser }) {
  const { isLoggedIn, login, logout } = useLogin();
  const [ws, setWs] = useState(null);
  const chatContainerRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [selectedSomething, selectSomething] = useState(false)
  const messageContainerRef = useRef(null);

  const handleWebSocketMessage = () => {
    loadMessages();
  };

  useEffect(() => {
      const newSocket = new WebSocket(`${WEBSOSCKETS}/${User}`);
      newSocket.onopen = () => {
          //console.log('WebSocket connection opened at chat-messages');
      };
      newSocket.onmessage = handleWebSocketMessage;
      newSocket.onclose = () => {
          //console.log('WebSocket connection closed at chat-messages');
      };
      setSocket(newSocket);
      return () => {
          newSocket.close();
      };
  }, []);

  async function loadMessages() {
      const data = await fetchMessages(User, discussion)
      if (data.detail == 'Discussion not found.' || data == 'error')
          selectSomething(false)
      else {
          setMessages(data)
          selectSomething(true)
      }
  }

  useEffect(() => {
      loadMessages()
  }, [discussion])

  useEffect(() => {
      if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      }
  }, [messages]);


  return (
    <div>
      {isLoggedIn ? (
        discussion ? (
          <div className="w-auto ">
            <div className="mx-4 mt-4 mb-2 text-white h-10">
              {discussion.name}
            </div>
            <div
              ref={chatContainerRef}
              className="mb-4 flex h-[70vh] flex-col border-2 border-navbar-color overflow-auto p-5"
            >
              {messages.map((message) => (
                <div
                  className={`mb-10 w-1/2 ${message.user_id === User ? 'self-end' : 'self-start'}`}
                  key={message.id}
                >
                  <ChatMessage
                    value={message.value}
                    userName={message.name}
                    isMe={message.user_id === User}
                    key={message.id}
                  />
                </div>
              ))}
            </div>
            <ChatInput
              discussion={discussion}
              loadMessages={loadMessages} 
              selectDiscussion={selectDiscussion}
              User={User}
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
