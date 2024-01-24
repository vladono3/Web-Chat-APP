import { Button } from '@mantine/core'
import { Newchatmodal } from './chat-app-newchat'
import { AuthenticationForm } from './chat-login'


export function ChatControls({addContact}) {
  return (
    <div className='flex'>
      <Newchatmodal addContact={addContact}/>
      <AuthenticationForm/>
      <div class="mt-3 absolute top-0 right-3 w-10 h-10 flex items-center justify-center bg-custom-color rounded-full dark:bg-gray-600">
        <span class="font-medium">OV</span>
      </div>
    </div>
  )
}
