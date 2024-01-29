import { useState } from 'react';
import { Button, TextInput } from '@mantine/core';
import { API_SELF, MESSAGES_ENDPOINT, WEBSOSCKETS } from '../constants/constants';
import { useEffect } from 'react';


export function ChatInput({ discussion, loadMessages, selectDiscussion, User}) {
  const [value, setValue] = useState('');
  const [socket, setSocket] = useState(null);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
  };

  async function postMessage(message) {
    const body = {
      discussion_id: discussion,
      user_id: User,
      value: message,
    }
    
    const response = await window.fetch(`${API_SELF}${MESSAGES_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return data
  }

  useEffect(() => {
    const newSocket = new WebSocket(`${WEBSOSCKETS}/${User}`);
    newSocket.onopen = () => {
    };
    newSocket.onmessage = (event) => {
        loadMessages();
    };
    newSocket.onclose = () => {
    };
    setSocket(newSocket);
    return () => {
        newSocket.close();
    };
}, [discussion]);

  const sendMessage = () => {
          if (socket && value.trim() !== '') {
              const trimmedValue = value.trim();
              socket.send(trimmedValue);
              postMessage(trimmedValue);
              setTimeout(() => {
                  setValue('');
                }, 10);
            }
      };

  return (
    <div className="flex items-center gap-5">
    <textarea
      className="h-15 w-full border-2 text-custom-color"
      placeholder="Type a message..."
      value={value}
      onKeyDown={handleKeyDown}
      onChange={(event) => setValue(event.target.value)}
    />
    <Button
      variant="outline"
      className="block h-full w-40 p-4 bg-navbar-color text-custom-color border-navbar-color hover:bg-custom-color hover:text-navbar-color"
      onClick={sendMessage}>
      Send message
    </Button>
  </div>
  );
}

export default ChatInput;