import React from 'react'
import { Avatar, Button } from '@mantine/core'
import { USER_ID } from '../constants/constants'

export function changeContact () {

  

}

export default function ChatList(props) {
  return (
    <Button onClick={() => changeContact()} className='w-full mb-2 h-12 flex'>
        <Avatar>
        {props.userName.charAt(0).toUpperCase()}
        </Avatar>
        <div className='text-white ml-3'>{props.userName}</div>
    </Button>
  )
}
