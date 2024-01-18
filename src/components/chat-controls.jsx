import { Button } from '@mantine/core'
import { Newchatmodal } from './chat-app-newchat'
export function ChatControls() {
  return (
    <div className='flex'>
      <Newchatmodal/>
      <Button className='bg-custom-color 
      px-5 
      mx-2  
      mt-3
      hover:bg-navbar-color
      hover:text-custom-color
      hover:border-custom-color'>
        Discussions
      </Button>
      <Button onClick={() => Newchatmodal(props.value={true})} className='bg-custom-color 
      px-5
      mx-2
      mt-3
      hover:bg-navbar-color
      hover:text-custom-color
      hover:border-custom-color'>New Chat</Button>
      <div class="mt-3 absolute top-0 right-3 w-10 h-10 flex items-center justify-center bg-custom-color rounded-full dark:bg-gray-600">
        <span class="font-medium">OV</span>
      </div>
    </div>
  )
}
