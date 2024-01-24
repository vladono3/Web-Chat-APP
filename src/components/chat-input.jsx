import { useState } from 'react';
import { Button, TextInput } from '@mantine/core';
import { USER_ID, API_SELF, MESSAGES_ENDPOINT } from '../constants/constants';
export function ChatInput({ discussion, selectDiscussion }) {
  const [value, setValue] = useState('');
  async function postMessage(message) {
    const body = {
      discussion_id: discussion,
      user_id: USER_ID,
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
  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.trim() !== '') {
      postMessage(value);
      selectDiscussion(discussion);
      setValue(''); // Reset input value
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-custom-color">
      <TextInput
        className="h-15 w-full border-2"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Enter a message"
      />

      <Button
        type="submit"
        variant="outline"
        className="block h-full w-40 p-4 bg-navbar-color text-custom-color border-navbar-color hover:bg-custom-color hover:text-navbar-color"
      >
        Send message
      </Button>
    </form>
  );
}

export default ChatInput;
