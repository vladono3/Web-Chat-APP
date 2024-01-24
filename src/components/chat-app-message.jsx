import { Avatar } from '@mantine/core'


export function ChatMessage({value, userName, isMe, key}) {
  return (
    <div
      className={`${isMe ? '' : 'rounded-lg text-black'}`}>
      <div className={`flex items-center ${isMe ? 'flex-row-reverse' : ''}`}>
        <Avatar color={isMe ? 'blue' : 'white'} className='text-black' size="lg">
          {userName}
        </Avatar>
        <div className='mx-3 bg-white text-custom-color rounded-lg p-3'>{value}</div>
      </div>
    </div>
  )
}